#!/usr/bin/env python3

import os
import fnmatch
import sys
import argparse
import time

def load_patterns_file(file_path):
    """
    Generic function to load patterns (whitelist or blacklist)
    from a given file path, returning a list of patterns.
    """
    patterns = []
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    patterns.append(line)
    return patterns

def matches_patterns(path, patterns):
    """
    Checks if the given path (relative) matches any pattern in patterns
    using fnmatch.
    """
    for pattern in patterns:
        if fnmatch.fnmatch(path, pattern):
            return True
    return False

def is_code_file(filename):
    """
    Identifies if a file is likely to contain code, based on extension.
    """
    code_extensions = [
        '.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.java',
        '.cpp', '.c', '.go', '.rb', '.php', '.cs', '.sh', '.json'
    ]
    ext = os.path.splitext(filename)[1].lower()
    return ext in code_extensions

def delete_dot_underscore_files(base_dir, verbose=False):
    """
    Searches for any files starting with '._' under base_dir
    and offers to delete them.
    """
    dot_underscore_files = []
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.startswith("._"):
                dot_underscore_files.append(os.path.join(root, file))

    if dot_underscore_files:
        if verbose:
            print("Found the following `._` files:")
            for f in dot_underscore_files:
                print(f)
        choice = input("Do you want to delete these files? (y/n): ").strip().lower()
        if choice == 'y':
            for f in dot_underscore_files:
                try:
                    os.remove(f)
                    if verbose:
                        print(f"Deleted: {f}")
                except Exception as e:
                    print(f"Could not delete {f}: {e}")
            print("`._` files deleted.")
        else:
            print("`._` files not deleted.")

def include_subtree(path, base_dir, included_files, file_counter, line_counter, verbose=False):
    """
    Recursively include the entire subtree under 'path'.
    Returns a dict structure describing directories/files.
    Also returns updated file_counter & line_counter.
    """
    structure = {'_files': {}}
    for item in os.listdir(path):
        full_path = os.path.join(path, item)
        rel_path = os.path.relpath(full_path, base_dir)

        # Real-time status update
        file_counter[0] += 1
        _update_status(file_counter[0], full_path, line_counter[0])

        if os.path.isfile(full_path):
            structure['_files'][item] = full_path
            included_files.append(full_path)
        else:
            # It's a directory
            subtree, file_counter, line_counter = include_subtree(
                full_path, base_dir, included_files, file_counter, line_counter, verbose
            )
            structure[item] = subtree
    return structure, file_counter, line_counter

def _update_status(files_processed, current_file, lines_count):
    """
    Prints a single-line real-time status update.
    Overwrites the previous line for readability.
    """
    status_message = (
        f"\rProcessed {files_processed} files | "
        f"Currently Indexing: {current_file} | "
        f"Structure MD Current Line Count: {lines_count}"
    )
    # Print and flush without adding a new line
    sys.stdout.write(status_message)
    sys.stdout.flush()

def build_structure(base_dir, whitelist_patterns, blacklist_patterns, file_counter, line_counter, verbose=False):
    """
    Builds the project structure in a nested dictionary, respecting:
      - Whitelist: items must match to be considered
      - Blacklist: items must *not* match to be included
    file_counter and line_counter are passed around to track real-time progress.
    """
    structure = {'_files': {}}
    included_files = []

    def process_directory(current_dir, current_structure):
        rel_dir = os.path.relpath(current_dir, base_dir)
        if rel_dir == '.':
            rel_dir = ''

        # If directory exactly matches whitelist and not in blacklist, include entire subtree
        if (
            (rel_dir == '' and matches_patterns('.', whitelist_patterns))
            or (rel_dir and matches_patterns(rel_dir, whitelist_patterns))
        ) and not matches_patterns(rel_dir, blacklist_patterns):
            subtree, fc, lc = include_subtree(current_dir, base_dir, included_files, file_counter, line_counter, verbose)
            # Merge subtree into current structure
            for k, v in subtree.items():
                current_structure[k] = v
            return

        # Otherwise, check children individually
        for item in os.listdir(current_dir):
            full_path = os.path.join(current_dir, item)
            rel_path = os.path.relpath(full_path, base_dir)

            # Real-time status update
            file_counter[0] += 1
            _update_status(file_counter[0], full_path, line_counter[0])

            if os.path.isfile(full_path):
                if matches_patterns(rel_path, whitelist_patterns) and not matches_patterns(rel_path, blacklist_patterns):
                    current_structure['_files'][item] = full_path
                    included_files.append(full_path)
            else:
                # It's a directory
                if (
                    matches_patterns(rel_path, whitelist_patterns)
                    and not matches_patterns(rel_path, blacklist_patterns)
                ):
                    # Entire subtree included
                    subtree, fc, lc = include_subtree(full_path, base_dir, included_files, file_counter, line_counter, verbose)
                    current_structure[item] = subtree
                else:
                    # Not directly whitelisted, so check its contents individually
                    sub_structure = {'_files': {}}
                    process_directory(full_path, sub_structure)
                    # Only add if it contains something
                    if len(sub_structure) > 1 or len(sub_structure['_files']) > 0:
                        current_structure[item] = sub_structure

    process_directory(base_dir, structure)
    return structure, included_files

def write_structure_md(structure, out, line_counter, indent=0):
    """
    Writes a nested structure to the markdown file, with indentation levels.
    Also updates the line_counter accordingly.
    """
    prefix = '  ' * indent
    # Print files first
    if '_files' in structure:
        for fname in structure['_files']:
            out.write(f"{prefix}- `{fname}`\n")
            line_counter[0] += 1
        # Add a blank line
        out.write("\n")
        line_counter[0] += 1

    # Now directories
    for key, value in structure.items():
        if key == '_files':
            continue
        # It's a directory
        out.write(f"{prefix}`{key}`\n")
        line_counter[0] += 1
        out.write(f"{prefix}==============\n")
        line_counter[0] += 1
        write_structure_md(value, out, line_counter, indent+1)

def main():
    parser = argparse.ArgumentParser(description="Prompt Setup with Whitelist, Blacklist, Preset Prompts, and Verbose Mode.")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose output.")
    args = parser.parse_args()
    verbose = args.verbose

    base_dir = os.getcwd()
    whitelist_file = os.path.join(base_dir, 'promptsetup.whitelist')
    blacklist_file = os.path.join(base_dir, 'promptsetup.blacklist')

    # ============ 1) Prompt Selection ============

    # We have 6 total prompts:
    #  - 3 existing from the user
    #  - 3 new ones we create
    # We'll only show short summaries; user picks which to use in the MD.
    prompts = [
        {
            "id": "A",
            "summary": "Basic project read & understand",
            "text": "this is my project, please read the contents and understand its functionality. once done, let me know and await my requests."
        },
        {
            "id": "B",
            "summary": "Show project as it is now",
            "text": "here is what my entire project looks like right now, so you can understand the updates and work with this version now"
        },
        {
            "id": "C",
            "summary": "Software developer instructions & rules",
            "text": (
                "Hi, you are a software developer who will help me program. "
                "This is a MD file of all the files and their paths in my program. Please read over it, "
                "and wait for my requests. When I request changes, I'd like you to send all changes in FULL CODE form, "
                "meaning send me the entire file each time (and any other files that ever need to be updated). "
                "I'd also like you to skim over the documentation of whatever we are working on EACH TIME we make a change, if possible. "
                "Also, never alter any functionality I don't ask you to. You may now read over this and tell me that you understand these rules"
            )
        },
        {
            "id": "D",
            "summary": "Basic code reviewer greeting",
            "text": (
                "Hello, you are a helpful code reviewer who will read my project and stand by for future tasks. "
                "Please let me know once you have read the project and are ready to proceed with any changes I might request."
            )
        },
        {
            "id": "E",
            "summary": "Code consultant approach",
            "text": (
                "You are a code consultant who will provide best practices and tips on the project structure as you read. "
                "Let me know when you're done analyzing, and we can discuss improvements."
            )
        },
        {
            "id": "F",
            "summary": "AI assistant reading instructions",
            "text": (
                "Hello, you are an AI assistant who will carefully read this project structure. "
                "Once you have finished, confirm your understanding and be prepared for my instructions."
            )
        },
    ]

    # Display short summary, user chooses an option
    print("Select a prompt to include in the generated MD file:")
    for p in prompts:
        print(f"  {p['id']}. {p['summary']}")
    chosen_id = input("Enter your choice (A-F): ").strip().upper()

    # Find the selected prompt (default to first if invalid choice)
    selected_prompt = prompts[0]["text"]
    for p in prompts:
        if p["id"] == chosen_id:
            selected_prompt = p["text"]
            break

    # ============ 2) Check for Whitelist, Blacklist ============

    # Ask if user wants to create promptsetup.whitelist if it doesn't exist
    if not os.path.exists(whitelist_file):
        user_choice = input("promptsetup.whitelist does not exist. Would you like to create it? (y/n): ").strip().lower()
        if user_choice == 'y':
            sample_content = [
                "src"
            ]
            with open(whitelist_file, 'w', encoding='utf-8') as f:
                f.write("\n".join(sample_content))
            print("promptsetup.whitelist file created with sample entries.")
        else:
            print("Continuing without a whitelist file. No files will be included.")

    # Ask if user wants to create promptsetup.blacklist if it doesn't exist
    if not os.path.exists(blacklist_file):
        user_choice = input("promptsetup.blacklist does not exist. Would you like to create it? (y/n): ").strip().lower()
        if user_choice == 'y':
            sample_content = [
                "node_modules"
            ]
            with open(blacklist_file, 'w', encoding='utf-8') as f:
                f.write("\n".join(sample_content))
            print("promptsetup.blacklist file created with sample entries.")
        else:
            print("Continuing without a blacklist file. No folders/files will be actively excluded.")

    # ============ 3) Delete ._ Files ============

    delete_dot_underscore_files(base_dir, verbose=verbose)

    # ============ 4) Load Patterns ============

    whitelist_patterns = load_patterns_file(whitelist_file)
    blacklist_patterns = load_patterns_file(blacklist_file)

    # ============ 5) Build Structure ============

    # We'll track processed file count in a list so we can modify it inside sub-functions
    file_counter = [0]     # single-element list acts as 'mutable integer'
    line_counter = [0]     # track lines in the MD

    structure, included_files = build_structure(
        base_dir,
        whitelist_patterns,
        blacklist_patterns,
        file_counter,
        line_counter,
        verbose=verbose
    )

    # Newline at the end of final status line
    print("")

    # ============ 6) Write Output Markdown File ============

    output_file = os.path.join(base_dir, 'project_structure.md')
    with open(output_file, 'w', encoding='utf-8') as out:
        # First, write the selected prompt at the top
        out.write(selected_prompt + "\n\n")
        line_counter[0] += 2

        if not structure or (len(structure) == 1 and not structure['_files']):
            out.write("No directories or files are whitelisted.\n")
            line_counter[0] += 1
        else:
            # Handle root-level files
            if '_files' in structure and structure['_files']:
                out.write("`.` (Root)\n")
                line_counter[0] += 1
                out.write("==============\n")
                line_counter[0] += 1

                for fname in structure['_files']:
                    out.write(f"- `{fname}`\n")
                    line_counter[0] += 1

                out.write("\n")
                line_counter[0] += 1
                del structure['_files']

            # Now handle directories
            for dirname in structure:
                out.write(f"`{dirname}`\n")
                line_counter[0] += 1
                out.write("==============\n")
                line_counter[0] += 1
                write_structure_md(structure[dirname], out, line_counter, indent=1)

            # After printing entire structure, print code files
            code_files = [f for f in included_files if is_code_file(os.path.basename(f))]
            if code_files:
                out.write("\n## Included Files with Code\n\n")
                line_counter[0] += 2

                for fpath in code_files:
                    rel_path = os.path.relpath(fpath, base_dir)
                    out.write(f"### {rel_path}\n\n")
                    line_counter[0] += 2
                    out.write("``` \n")
                    line_counter[0] += 1
                    try:
                        with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
                            for line in f:
                                out.write(line)
                                # We'll increment line_counter for each line we write
                                line_counter[0] += 1
                    except Exception:
                        out.write("Could not read file contents.\n")
                        line_counter[0] += 1
                    out.write("```\n\n")
                    line_counter[0] += 2

    print(f"Project structure file generated: {output_file}")
    if verbose:
        print(f"Total lines written to MD: {line_counter[0]}")

if __name__ == "__main__":
    main()
