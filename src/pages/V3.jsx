import React, { useRef, useEffect, memo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import PeriodProgress from '../components/PeriodProgress';
import { useWeekSchedule } from '../context/WeekScheduleContext';
import Cookies from 'js-cookie';
import { FaEdit, FaSave, FaRedo, FaPlus, FaLayerGroup } from 'react-icons/fa';
import Schedule from '../components/Schedule';
import GoogleCalendar from '../components/GoogleCalendar';
import WeatherDashboard from '../components/WeatherDashboard';  // Updated import
import DayHeader from '../components/DayHeader';
import PopupMessage from '../components/PopupMessage';
import { useAuth } from '../context/AuthContext';
import {
  DEFAULT_PROGRESS_SIZE,
  DEFAULT_SCHEDULE_SIZE,
  DEFAULT_CALENDAR_SIZE,
  DEFAULT_WEATHER_SIZE,
  DEFAULT_HEADER_SIZE,
  DEFAULT_POSITIONS,
  DEFAULT_VISIBILITY,
  TEMPLATES
} from '../layouts/dashtemplates';

const V3 = memo(() => {
  const { currentTheme } = useTheme();
  const { weekSchedule, fetchSchedule } = useWeekSchedule();
  const { isAdmin } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(() => {
    const saved = Cookies.get('progressBarSize');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS_SIZE;
  });
  const [resizing, setResizing] = useState(null);
  const [scheduleSize, setScheduleSize] = useState(() => {
    const saved = Cookies.get('scheduleSize');
    return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE_SIZE;
  });
  const [schedulePosition, setSchedulePosition] = useState(() => {
    const saved = Cookies.get('schedulePosition');
    return saved ? JSON.parse(saved) : DEFAULT_POSITIONS.schedule;
  });
  const scheduleRef = useRef(null);
  const [calendarSize, setCalendarSize] = useState(() => {
    const saved = Cookies.get('calendarSize');
    return saved ? JSON.parse(saved) : DEFAULT_CALENDAR_SIZE;
  });
  const [calendarPosition, setCalendarPosition] = useState(() => {
    const saved = Cookies.get('calendarPosition');
    return saved ? JSON.parse(saved) : DEFAULT_POSITIONS.calendar;
  });
  const [calendarDragging, setCalendarDragging] = useState(false);
  const calendarRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, component: null });
  const [visibleComponents, setVisibleComponents] = useState(() => {
    // First check template visibility
    const currentTemplateName = Cookies.get('currentTemplate') || 'default';
    const template = TEMPLATES[currentTemplateName];
    
    // Then check saved visibility, falling back to template defaults
    const saved = Cookies.get('componentVisibility');
    if (saved) {
      return {
        ...template.visibility, // Use template as base
        ...JSON.parse(saved)   // Override with any saved preferences
      };
    }
    
    return template.visibility;
  });
  const [showComponentList, setShowComponentList] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const [showFullAnnouncement, setShowFullAnnouncement] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(() => {
    return Cookies.get('currentTemplate') || 'default';
  });
  const [showDevOverlay, setShowDevOverlay] = useState(false);
  
  // Initialize position from cookies or center
  const [position, setPosition] = useState(() => {
    const saved = Cookies.get('progressBarPosition');
    return saved ? JSON.parse(saved) : DEFAULT_POSITIONS.progress;
  });

  // Add separate dragging states for each component
  const [progressDragging, setProgressDragging] = useState(false);
  const [scheduleDragging, setScheduleDragging] = useState(false);
  const [weatherSize, setWeatherSize] = useState(() => {
    const saved = Cookies.get('weatherSize');
    return saved ? JSON.parse(saved) : DEFAULT_WEATHER_SIZE;
  });
  const [weatherPosition, setWeatherPosition] = useState(() => {
    const saved = Cookies.get('weatherPosition');
    return saved ? JSON.parse(saved) : DEFAULT_POSITIONS.weather;
  });
  const weatherRef = useRef(null);
  const [weatherDragging, setWeatherDragging] = useState(false);
  const [headerSize, setHeaderSize] = useState(() => {
    const saved = Cookies.get('headerSize');
    return saved ? JSON.parse(saved) : DEFAULT_HEADER_SIZE;
  });
  const [headerPosition, setHeaderPosition] = useState(() => {
    const saved = Cookies.get('headerPosition');
    return saved ? JSON.parse(saved) : DEFAULT_POSITIONS.header;
  });
  const headerRef = useRef(null);
  const [headerDragging, setHeaderDragging] = useState(false);

  // Add new state to control animation timing
  const [startAnimations, setStartAnimations] = useState(false);

  // Add specific state for weather animation
  const [weatherMounted, setWeatherMounted] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // Add event listener for popup trigger
  useEffect(() => {
    const handlePopupTrigger = (e) => {
      setAnnouncement(e.detail.announcement);
      setShowFullAnnouncement(true);
    };

    window.addEventListener('showPopup', handlePopupTrigger);
    return () => window.removeEventListener('showPopup', handlePopupTrigger);
  }, []);

  // Add useEffect to trigger animations after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimations(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Modify useEffect to handle weather animation
  useEffect(() => {
    if (visibleComponents.weather) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setWeatherMounted(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setWeatherMounted(false);
    }
  }, [visibleComponents.weather]);

  const handleDragStart = (e) => {
    if (!editMode) return;
    e.preventDefault(); // Prevent text selection while dragging
    setProgressDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleDragMove = (e) => {
    if (!progressDragging || !editMode) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Constrain to window bounds
    const maxX = window.innerWidth - size.width; // Use dynamic width
    const maxY = window.innerHeight - size.height; // Use dynamic height
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleDragEnd = () => {
    if (!editMode) return;
    setProgressDragging(false);
    Cookies.set('progressBarPosition', JSON.stringify(position), { expires: 365 });
  };

  const handleResizeStart = (e, direction) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    setResizing('progress');
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
      direction: direction
    });
  };

  const handleProgressResize = (e) => {
    if (!resizing || !editMode || resizing !== 'progress') return;

    const deltaX = e.clientX - dragOffset.x;
    const deltaY = e.clientY - dragOffset.y;
    
    let newWidth = size.width;
    let newHeight = size.height;
    let newX = position.x;
    let newY = position.y;

    // Handle different resize directions
    if (resizing === 'progress') {
      switch (dragOffset.direction) {
        case 'right':
          newWidth += deltaX;
          break;
        case 'left':
          newWidth -= deltaX;
          newX += deltaX;
          break;
        case 'bottom':
          newHeight += deltaY;
          break;
        case 'top':
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'bottom-right':
          newWidth += deltaX;
          newHeight += deltaY;
          break;
        case 'bottom-left':
          newWidth -= deltaX;
          newHeight += deltaY;
          newX += deltaX;
          break;
        case 'top-right':
          newWidth += deltaX;
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'top-left':
          newWidth -= deltaX;
          newHeight -= deltaY;
          newX += deltaX;
          newY += deltaY;
          break;
      }
    }

    // Enforce minimum sizes
    const minWidth = 300;
    const minHeight = 100;
    
    if (newWidth >= minWidth) {
      setSize(prev => ({ ...prev, width: newWidth }));
      if (['left', 'top-left', 'bottom-left'].includes(dragOffset.direction)) {
        setPosition(prev => ({ ...prev, x: newX }));
      }
    }
    
    if (newHeight >= minHeight) {
      setSize(prev => ({ ...prev, height: newHeight }));
      if (['top', 'top-left', 'top-right'].includes(dragOffset.direction)) {
        setPosition(prev => ({ ...prev, y: newY }));
      }
    }

    setDragOffset({ x: e.clientX, y: e.clientY, direction: dragOffset.direction });
  };

  const handleProgressResizeEnd = () => {
    if (!editMode) return;
    setResizing(null);
    Cookies.set('progressBarSize', JSON.stringify(size), { expires: 365 });
  };

  const handleScheduleDragStart = (e) => {
    if (!editMode) return;
    e.preventDefault(); // Prevent text selection while dragging
    setScheduleDragging(true);
    setDragOffset({
      x: e.clientX - schedulePosition.x,
      y: e.clientY - schedulePosition.y
    });
  };

  const handleScheduleDragMove = (e) => {
    if (!scheduleDragging || !editMode) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Constrain to window bounds
    const maxX = window.innerWidth - scheduleSize.width; // Use dynamic width
    const maxY = window.innerHeight - scheduleSize.height; // Use dynamic height
    
    setSchedulePosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleScheduleDragEnd = () => {
    if (!editMode) return;
    setScheduleDragging(false);
    Cookies.set('schedulePosition', JSON.stringify(schedulePosition), { expires: 365 });
  };

  const handleScheduleResizeStart = (e, direction) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    setResizing('schedule');
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
      direction: direction
    });
  };

  const handleScheduleResize = (e) => {
    if (!resizing || !editMode || resizing !== 'schedule') return;

    const deltaX = e.clientX - dragOffset.x;
    const deltaY = e.clientY - dragOffset.y;
    
    let newWidth = scheduleSize.width;
    let newHeight = scheduleSize.height;
    let newX = schedulePosition.x;
    let newY = schedulePosition.y;

    // Handle different resize directions
    if (resizing === 'schedule') {
      switch (dragOffset.direction) {
        case 'right':
          newWidth += deltaX;
          break;
        case 'left':
          newWidth -= deltaX;
          newX += deltaX;
          break;
        case 'bottom':
          newHeight += deltaY;
          break;
        case 'top':
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'bottom-right':
          newWidth += deltaX;
          newHeight += deltaY;
          break;
        case 'bottom-left':
          newWidth -= deltaX;
          newHeight += deltaY;
          newX += deltaX;
          break;
        case 'top-right':
          newWidth += deltaX;
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'top-left':
          newWidth -= deltaX;
          newHeight -= deltaY;
          newX += deltaX;
          newY += deltaY;
          break;
      }
    }

    // Enforce minimum sizes
    const minWidth = 300;
    const minHeight = 400;
    
    if (newWidth >= minWidth) {
      setScheduleSize(prev => ({ ...prev, width: newWidth }));
      if (['left', 'top-left', 'bottom-left'].includes(dragOffset.direction)) {
        setSchedulePosition(prev => ({ ...prev, x: newX }));
      }
    }
    
    if (newHeight >= minHeight) {
      setScheduleSize(prev => ({ ...prev, height: newHeight }));
      if (['top', 'top-left', 'top-right'].includes(dragOffset.direction)) {
        setSchedulePosition(prev => ({ ...prev, y: newY }));
      }
    }

    setDragOffset({ x: e.clientX, y: e.clientY, direction: dragOffset.direction });
  };

  const handleScheduleResizeEnd = () => {
    if (!editMode) return;
    setResizing(null);
    Cookies.set('scheduleSize', JSON.stringify(scheduleSize), { expires: 365 });
  };

  // Add calendar handlers (similar to schedule handlers)
  const handleCalendarDragStart = (e) => {
    if (!editMode) return;
    e.preventDefault();
    setCalendarDragging(true);
    setDragOffset({
      x: e.clientX - calendarPosition.x,
      y: e.clientY - calendarPosition.y
    });
  };

  const handleCalendarDragMove = (e) => {
    if (!calendarDragging || !editMode) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setCalendarPosition({
      x: Math.max(0, Math.min(newX, window.innerWidth - calendarSize.width)),
      y: Math.max(0, Math.min(newY, window.innerHeight - calendarSize.height))
    });
  };

  const handleCalendarDragEnd = () => {
    if (!editMode) return;
    setCalendarDragging(false);
    Cookies.set('calendarPosition', JSON.stringify(calendarPosition), { expires: 365 });
  };

  const handleCalendarResizeStart = (e, direction) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    setResizing('calendar');
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
      direction: direction
    });
  };

  const handleCalendarResize = (e) => {
    if (!resizing || !editMode || resizing !== 'calendar') return;

    const deltaX = e.clientX - dragOffset.x;
    const deltaY = e.clientY - dragOffset.y;
    
    let newWidth = calendarSize.width;
    let newHeight = calendarSize.height;
    let newX = calendarPosition.x;
    let newY = calendarPosition.y;

    // Handle different resize directions
    if (resizing === 'calendar') {
      switch (dragOffset.direction) {
        case 'right':
          newWidth += deltaX;
          break;
        case 'left':
          newWidth -= deltaX;
          newX += deltaX;
          break;
        case 'bottom':
          newHeight += deltaY;
          break;
        case 'top':
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'bottom-right':
          newWidth += deltaX;
          newHeight += deltaY;
          break;
        case 'bottom-left':
          newWidth -= deltaX;
          newHeight += deltaY;
          newX += deltaX;
          break;
        case 'top-right':
          newWidth += deltaX;
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'top-left':
          newWidth -= deltaX;
          newHeight -= deltaY;
          newX += deltaX;
          newY += deltaY;
          break;
      }
    }

    // Enforce minimum sizes
    const minWidth = 300;
    const minHeight = 400;
    
    if (newWidth >= minWidth) {
      setCalendarSize(prev => ({ ...prev, width: newWidth }));
      if (['left', 'top-left', 'bottom-left'].includes(dragOffset.direction)) {
        setCalendarPosition(prev => ({ ...prev, x: newX }));
      }
    }
    
    if (newHeight >= minHeight) {
      setCalendarSize(prev => ({ ...prev, height: newHeight }));
      if (['top', 'top-left', 'top-right'].includes(dragOffset.direction)) {
        setCalendarPosition(prev => ({ ...prev, y: newY }));
      }
    }

    setDragOffset({ x: e.clientX, y: e.clientY, direction: dragOffset.direction });
  };

  const handleCalendarResizeEnd = () => {
    if (!editMode) return;
    setResizing(null);
    Cookies.set('calendarSize', JSON.stringify(calendarSize), { expires: 365 });
  };

  // Add weather handlers (similar to other components)
  const handleWeatherDragStart = (e) => {
    if (!editMode) return;
    e.preventDefault();
    setDragOffset({
      x: e.clientX - weatherPosition.x,
      y: e.clientY - weatherPosition.y
    });
    setWeatherDragging(true);
  };

  const handleWeatherDragMove = (e) => {
    if (!weatherDragging || !editMode) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setWeatherPosition({
      x: Math.max(0, Math.min(newX, window.innerWidth - weatherSize.width)),
      y: Math.max(0, Math.min(newY, window.innerHeight - weatherSize.height))
    });
  };

  const handleWeatherDragEnd = () => {
    if (!editMode) return;
    setWeatherDragging(false);
    Cookies.set('weatherPosition', JSON.stringify(weatherPosition), { expires: 365 });
  };

  const handleWeatherResizeStart = (e, direction) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    setResizing('weather');
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
      direction: direction
    });
  };

  const handleWeatherResize = (e) => {
    if (!resizing || !editMode || resizing !== 'weather') return;

    const deltaX = e.clientX - dragOffset.x;
    const deltaY = e.clientY - dragOffset.y;
    
    let newWidth = weatherSize.width;
    let newHeight = weatherSize.height;
    let newX = weatherPosition.x;
    let newY = weatherPosition.y;

    // Handle different resize directions
    if (resizing === 'weather') {
      switch (dragOffset.direction) {
        case 'right':
          newWidth += deltaX;
          break;
        case 'left':
          newWidth -= deltaX;
          newX += deltaX;
          break;
        case 'bottom':
          newHeight += deltaY;
          break;
        case 'top':
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'bottom-right':
          newWidth += deltaX;
          newHeight += deltaY;
          break;
        case 'bottom-left':
          newWidth -= deltaX;
          newHeight += deltaY;
          newX += deltaX;
          break;
        case 'top-right':
          newWidth += deltaX;
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'top-left':
          newWidth -= deltaX;
          newHeight -= deltaY;
          newX += deltaX;
          newY += deltaY;
          break;
      }
    }

    // Enforce minimum sizes
    const minWidth = 300;
    const minHeight = 150;
    
    if (newWidth >= minWidth) {
      setWeatherSize(prev => ({ ...prev, width: newWidth }));
      if (['left', 'top-left', 'bottom-left'].includes(dragOffset.direction)) {
        setWeatherPosition(prev => ({ ...prev, x: newX }));
      }
    }
    
    if (newHeight >= minHeight) {
      setWeatherSize(prev => ({ ...prev, height: newHeight }));
      if (['top', 'top-left', 'top-right'].includes(dragOffset.direction)) {
        setWeatherPosition(prev => ({ ...prev, y: newY }));
      }
    }

    setDragOffset({ x: e.clientX, y: e.clientY, direction: dragOffset.direction });
  };

  const handleWeatherResizeEnd = () => {
    if (!editMode) return;
    setResizing(null);
    Cookies.set('weatherSize', JSON.stringify(weatherSize), { expires: 365 });
  };

  // Add header handlers (similar to other components)
  const handleHeaderDragStart = (e) => {
    if (!editMode) return;
    e.preventDefault();
    setHeaderDragging(true);
    setDragOffset({
      x: e.clientX - headerPosition.x,
      y: e.clientY - headerPosition.y
    });
  };

  const handleHeaderDragMove = (e) => {
    if (!headerDragging || !editMode) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    setHeaderPosition({
      x: Math.max(0, Math.min(newX, window.innerWidth - headerSize.width)),
      y: Math.max(0, Math.min(newY, window.innerHeight - headerSize.height))
    });
  };

  const handleHeaderDragEnd = () => {
    if (!editMode) return;
    setHeaderDragging(false);
    Cookies.set('headerPosition', JSON.stringify(headerPosition), { expires: 365 });
  };

  const handleHeaderResizeStart = (e, direction) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    setResizing('header');
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
      direction: direction
    });
  };

  const handleHeaderResize = (e) => {
    if (!resizing || !editMode || resizing !== 'header') return;

    const deltaX = e.clientX - dragOffset.x;
    const deltaY = e.clientY - dragOffset.y;
    
    let newWidth = headerSize.width;
    let newHeight = headerSize.height;
    let newX = headerPosition.x;
    let newY = headerPosition.y;

    // Handle different resize directions
    if (resizing === 'header') {
      switch (dragOffset.direction) {
        case 'right':
          newWidth += deltaX;
          break;
        case 'left':
          newWidth -= deltaX;
          newX += deltaX;
          break;
        case 'bottom':
          newHeight += deltaY;
          break;
        case 'top':
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'bottom-right':
          newWidth += deltaX;
          newHeight += deltaY;
          break;
        case 'bottom-left':
          newWidth -= deltaX;
          newHeight += deltaY;
          newX += deltaX;
          break;
        case 'top-right':
          newWidth += deltaX;
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case 'top-left':
          newWidth -= deltaX;
          newHeight -= deltaY;
          newX += deltaX;
          newY += deltaY;
          break;
      }
    }

    // Enforce minimum sizes
    const minWidth = 300;
    const minHeight = 150;
    
    if (newWidth >= minWidth) {
      setHeaderSize(prev => ({ ...prev, width: newWidth }));
      if (['left', 'top-left', 'bottom-left'].includes(dragOffset.direction)) {
        setHeaderPosition(prev => ({ ...prev, x: newX }));
      }
    }
    
    if (newHeight >= minHeight) {
      setHeaderSize(prev => ({ ...prev, height: newHeight }));
      if (['top', 'top-left', 'top-right'].includes(dragOffset.direction)) {
        setHeaderPosition(prev => ({ ...prev, y: newY }));
      }
    }

    setDragOffset({ x: e.clientX, y: e.clientY, direction: dragOffset.direction });
  };

  const handleHeaderResizeEnd = () => {
    if (!editMode) return;
    setResizing(null);
    Cookies.set('headerSize', JSON.stringify(headerSize), { expires: 365 });
  };

  // Update effect to handle different drag states
  useEffect(() => {
    if (progressDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
    if (scheduleDragging) {
      document.addEventListener('mousemove', handleScheduleDragMove);
      document.addEventListener('mouseup', handleScheduleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleScheduleDragMove);
        document.removeEventListener('mouseup', handleScheduleDragEnd);
      };
    }
    if (calendarDragging) {
      document.addEventListener('mousemove', handleCalendarDragMove);
      document.addEventListener('mouseup', handleCalendarDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleCalendarDragMove);
        document.removeEventListener('mouseup', handleCalendarDragEnd);
      };
    }
    if (weatherDragging) {
      document.addEventListener('mousemove', handleWeatherDragMove);
      document.addEventListener('mouseup', handleWeatherDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleWeatherDragMove);
        document.removeEventListener('mouseup', handleWeatherDragEnd);
      };
    }
    if (headerDragging) {
      document.addEventListener('mousemove', handleHeaderDragMove);
      document.addEventListener('mouseup', handleHeaderDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleHeaderDragMove);
        document.removeEventListener('mouseup', handleHeaderDragEnd);
      };
    }
  }, [progressDragging, scheduleDragging, calendarDragging, weatherDragging, headerDragging]);

  useEffect(() => {
    if (resizing) {
      const handleResize = resizing === 'progress' ? handleProgressResize : 
                          resizing === 'schedule' ? handleScheduleResize :
                          resizing === 'calendar' ? handleCalendarResize :
                          resizing === 'weather' ? handleWeatherResize :
                          handleHeaderResize;
      
      const handleResizeEnd = resizing === 'progress' ? handleProgressResizeEnd :
                             resizing === 'schedule' ? handleScheduleResizeEnd :
                             resizing === 'calendar' ? handleCalendarResizeEnd :
                             resizing === 'weather' ? handleWeatherResizeEnd :
                             handleHeaderResizeEnd;

      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizing]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      Cookies.set('progressBarPosition', JSON.stringify(position), { expires: 365 });
      Cookies.set('progressBarSize', JSON.stringify(size), { expires: 365 });
      Cookies.set('schedulePosition', JSON.stringify(schedulePosition), { expires: 365 });
      Cookies.set('scheduleSize', JSON.stringify(scheduleSize), { expires: 365 });
      Cookies.set('calendarPosition', JSON.stringify(calendarPosition), { expires: 365 });
      Cookies.set('calendarSize', JSON.stringify(calendarSize), { expires: 365 });
      Cookies.set('weatherPosition', JSON.stringify(weatherPosition), { expires: 365 });
      Cookies.set('weatherSize', JSON.stringify(weatherSize), { expires: 365 });
      Cookies.set('headerPosition', JSON.stringify(headerPosition), { expires: 365 });
      Cookies.set('headerSize', JSON.stringify(headerSize), { expires: 365 });
    }
  };

  const resetLayout = () => {
    setSize(DEFAULT_PROGRESS_SIZE);
    setPosition(DEFAULT_POSITIONS.progress);
    setScheduleSize(DEFAULT_SCHEDULE_SIZE);
    setSchedulePosition(DEFAULT_POSITIONS.schedule);
    setCalendarSize(DEFAULT_CALENDAR_SIZE);
    setCalendarPosition(DEFAULT_POSITIONS.calendar);
    setWeatherSize(DEFAULT_WEATHER_SIZE);
    setWeatherPosition(DEFAULT_POSITIONS.weather);
    setHeaderSize(DEFAULT_HEADER_SIZE);
    setHeaderPosition(DEFAULT_POSITIONS.header);
    Cookies.set('progressBarSize', JSON.stringify(DEFAULT_PROGRESS_SIZE), { expires: 365 });
    Cookies.set('progressBarPosition', JSON.stringify(DEFAULT_POSITIONS.progress), { expires: 365 });
    Cookies.set('scheduleSize', JSON.stringify(DEFAULT_SCHEDULE_SIZE), { expires: 365 });
    Cookies.set('schedulePosition', JSON.stringify(DEFAULT_POSITIONS.schedule), { expires: 365 });
    Cookies.set('calendarSize', JSON.stringify(DEFAULT_CALENDAR_SIZE), { expires: 365 });
    Cookies.set('calendarPosition', JSON.stringify(DEFAULT_POSITIONS.calendar), { expires: 365 });
    Cookies.set('weatherSize', JSON.stringify(DEFAULT_WEATHER_SIZE), { expires: 365 });
    Cookies.set('weatherPosition', JSON.stringify(DEFAULT_POSITIONS.weather), { expires: 365 });
    Cookies.set('headerSize', JSON.stringify(DEFAULT_HEADER_SIZE), { expires: 365 });
    Cookies.set('headerPosition', JSON.stringify(DEFAULT_POSITIONS.header), { expires: 365 });
  };

  const handleContextMenu = (e, component) => {
    if (!editMode) return;
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      component
    });
  };

  const hideComponent = (component) => {
    setVisibleComponents(prev => ({
      ...prev,
      [component]: false
    }));
    setContextMenu({ show: false, x: 0, y: 0, component: null });
    Cookies.set('componentVisibility', JSON.stringify({
      ...visibleComponents,
      [component]: false
    }), { expires: 365 });
  };

  const showComponent = (component) => {
    setVisibleComponents(prev => ({
      ...prev,
      [component]: true
    }));
    setShowComponentList(false);
    Cookies.set('componentVisibility', JSON.stringify({
      ...visibleComponents,
      [component]: true
    }), { expires: 365 });
  };

  const resetComponentScale = (component) => {
    switch(component) {
      case 'progress':
        setSize(DEFAULT_PROGRESS_SIZE);
        Cookies.set('progressBarSize', JSON.stringify(DEFAULT_PROGRESS_SIZE), { expires: 365 });
        break;
      case 'schedule':
        setScheduleSize(DEFAULT_SCHEDULE_SIZE);
        Cookies.set('scheduleSize', JSON.stringify(DEFAULT_SCHEDULE_SIZE), { expires: 365 });
        break;
      case 'calendar':
        setCalendarSize(DEFAULT_CALENDAR_SIZE);
        Cookies.set('calendarSize', JSON.stringify(DEFAULT_CALENDAR_SIZE), { expires: 365 });
        break;
      case 'weather':
        setWeatherSize(DEFAULT_WEATHER_SIZE);
        Cookies.set('weatherSize', JSON.stringify(DEFAULT_WEATHER_SIZE), { expires: 365 });
        break;
      case 'header':
        setHeaderSize(DEFAULT_HEADER_SIZE);
        Cookies.set('headerSize', JSON.stringify(DEFAULT_HEADER_SIZE), { expires: 365 });
        break;
    }
    setContextMenu({ show: false, x: 0, y: 0, component: null });
  };

  const resetComponentPosition = (component) => {
    switch(component) {
      case 'progress':
        setPosition(DEFAULT_POSITIONS.progress);
        Cookies.set('progressBarPosition', JSON.stringify(DEFAULT_POSITIONS.progress), { expires: 365 });
        break;
      case 'schedule':
        setSchedulePosition(DEFAULT_POSITIONS.schedule);
        Cookies.set('schedulePosition', JSON.stringify(DEFAULT_POSITIONS.schedule), { expires: 365 });
        break;
      case 'calendar':
        setCalendarPosition(DEFAULT_POSITIONS.calendar);
        Cookies.set('calendarPosition', JSON.stringify(DEFAULT_POSITIONS.calendar), { expires: 365 });
        break;
      case 'weather':
        setWeatherPosition(DEFAULT_POSITIONS.weather);
        Cookies.set('weatherPosition', JSON.stringify(DEFAULT_POSITIONS.weather), { expires: 365 });
        break;
      case 'header':
        setHeaderPosition(DEFAULT_POSITIONS.header);
        Cookies.set('headerPosition', JSON.stringify(DEFAULT_POSITIONS.header), { expires: 365 });
        break;
    }
    setContextMenu({ show: false, x: 0, y: 0, component: null });
  };

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setContextMenu({ show: false, x: 0, y: 0, component: null });
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Update transform style to use proper dragging state
  const getTransformStyle = () => ({
    position: 'fixed',
    left: position.x,
    top: position.y,
    width: `${size.width}px`,
    height: `${size.height}px`,
    cursor: editMode ? 'move' : 'default',
    transform: editMode && resizing === 'progress' ? 'scale(1.02)' : 'scale(1)',
    transition: (progressDragging || resizing === 'progress') ? 'none' : 'all 0.3s ease',
    zIndex: editMode ? 40 : 'auto'
  });

  const getScheduleStyle = () => ({
    position: 'fixed',
    left: schedulePosition.x,
    top: schedulePosition.y,
    width: `${scheduleSize.width}px`,
    height: `${scheduleSize.height}px`,
    cursor: editMode ? 'move' : 'default',
    transform: editMode && resizing === 'schedule' ? 'scale(1.02)' : 'scale(1)',
    transition: (scheduleDragging || resizing === 'schedule') ? 'none' : 'all 0.3s ease',
    zIndex: editMode ? 40 : 'auto'
  });

  const getCalendarStyle = () => ({
    position: 'fixed',
    left: calendarPosition.x,
    top: calendarPosition.y,
    width: `${calendarSize.width}px`,
    height: `${calendarSize.height}px`,
    cursor: editMode ? 'move' : 'default',
    transform: editMode && resizing === 'calendar' ? 'scale(1.02)' : 'scale(1)',
    transition: (calendarDragging || resizing === 'calendar') ? 'none' : 'all 0.3s ease',
    zIndex: editMode ? 40 : 'auto'
  });

  const getWeatherStyle = () => ({
    position: 'fixed',
    left: weatherPosition.x,
    top: weatherPosition.y,
    width: `${weatherSize.width}px`,
    height: `${weatherSize.height}px`,
    cursor: editMode ? 'move' : 'default',
    transform: editMode && resizing === 'weather' ? 'scale(1.02)' : 'scale(1)',
    transition: (weatherDragging || resizing === 'weather') ? 'none' : 'all 0.3s ease',
    zIndex: editMode ? 40 : 'auto'
  });

  const getHeaderStyle = () => ({
    position: 'fixed',
    left: headerPosition.x,
    top: headerPosition.y,
    width: `${headerSize.width}px`,
    height: `${headerSize.height}px`,
    cursor: editMode ? 'move' : 'default',
    transform: editMode && resizing === 'header' ? 'scale(1.02)' : 'scale(1)',
    transition: (headerDragging || resizing === 'header') ? 'none' : 'all 0.3s ease',
    zIndex: editMode ? 40 : 'auto'
  });

  const saveAsUserTemplate = () => {
    const userTemplate = {
      positions: {
        progress: position,
        schedule: schedulePosition,
        calendar: calendarPosition,
        weather: weatherPosition,
        header: headerPosition
      },
      sizes: {
        progress: size,
        schedule: scheduleSize,
        calendar: calendarSize,
        weather: weatherSize,
        header: headerSize
      },
      visibility: visibleComponents,
      name: 'Custom Layout'
    };

    TEMPLATES.user = userTemplate;
    setCurrentTemplate('user');
    Cookies.set('userTemplate', JSON.stringify(userTemplate), { expires: 365 });
    Cookies.set('currentTemplate', 'user', { expires: 365 });
  };

  // Load user template on mount
  useEffect(() => {
    const savedUserTemplate = Cookies.get('userTemplate');
    if (savedUserTemplate) {
      TEMPLATES.user = JSON.parse(savedUserTemplate);
    }
  }, []);

  const handleTemplateSwitch = (name, config) => {
    setSize(config.sizes.progress || DEFAULT_PROGRESS_SIZE);
    setPosition(config.positions.progress || DEFAULT_POSITIONS.progress);
    setScheduleSize(config.sizes.schedule || DEFAULT_SCHEDULE_SIZE);
    setSchedulePosition(config.positions.schedule || DEFAULT_POSITIONS.schedule);
    setCalendarSize(config.sizes.calendar || DEFAULT_CALENDAR_SIZE);
    setCalendarPosition(config.positions.calendar || DEFAULT_POSITIONS.calendar);
    setWeatherSize(config.sizes.weather || DEFAULT_WEATHER_SIZE);
    setWeatherPosition(config.positions.weather || DEFAULT_POSITIONS.weather);
    setHeaderSize(config.sizes.header || DEFAULT_HEADER_SIZE);
    setHeaderPosition(config.positions.header || DEFAULT_POSITIONS.header);
    setVisibleComponents(config.visibility);
    setCurrentTemplate(name);
    setShowTemplates(false);
            
    Cookies.set('currentTemplate', name, { expires: 365 });
    Cookies.set('componentVisibility', JSON.stringify(config.visibility), { expires: 365 });
  };

  // Add DevOverlay component
  const DevOverlay = ({ component, position, size }) => {
    if (!showDevOverlay || !isAdmin()) return null;
    
    return (
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs z-50 pointer-events-none">
        <div>pos: {JSON.stringify(position)}</div>
        <div>size: {JSON.stringify(size)}</div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${currentTheme.main} ${currentTheme.text}`}>
      {/* Remove existing toolbar from top-right */}
      
      {/* Components section - keep existing code */}
      {visibleComponents.progress && (
        <div 
          ref={containerRef}
          style={getTransformStyle()}
          onMouseDown={handleDragStart}
          onContextMenu={(e) => handleContextMenu(e, 'progress')}
          className={`select-none relative rounded-lg overflow-hidden fade-in-scale delay-1
            ${editMode ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg' : 'border-2 border-opacity-20 border-slate-400'}`}
        >
          <DevOverlay component="progress" position={position} size={size} />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
              zIndex: 0,
            }}
          />
          <div className="relative z-10 w-full h-full">
            <PeriodProgress weekSchedule={weekSchedule} />
          </div>

          {editMode && (
            <>
              {/* Corner handles - Add pointer-events-auto */}
              <div className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'bottom-right')} />
              <div className="absolute left-0 bottom-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'bottom-left')} />
              <div className="absolute right-0 top-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'top-right')} />
              <div className="absolute left-0 top-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'top-left')} />
              
              {/* Edge handles - Add pointer-events-auto */}
              <div className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'right')} />
              <div className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'left')} />
              <div className="absolute top-0 left-4 right-4 h-2 cursor-n-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'top')} />
              <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleResizeStart(e, 'bottom')} />
            </>
          )}
        </div>
      )}

      {visibleComponents.schedule && (
        <div
          ref={scheduleRef}
          style={getScheduleStyle()}
          onMouseDown={handleScheduleDragStart}
          onContextMenu={(e) => handleContextMenu(e, 'schedule')}
          className={`select-none relative rounded-lg overflow-hidden fade-in-scale delay-2
            ${editMode ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg' : 'border-2 border-opacity-20 border-slate-400'}`}
        >
          <DevOverlay component="schedule" position={schedulePosition} size={scheduleSize} />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
              zIndex: 0,
            }}
          />
          <div className="relative z-10 w-full h-full">
            <Schedule weekSchedule={weekSchedule} />
          </div>

          {editMode && (
            <>
              {/* Corner handles */}
              <div className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'bottom-right')} />
              <div className="absolute left-0 bottom-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'bottom-left')} />
              <div className="absolute right-0 top-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'top-right')} />
              <div className="absolute left-0 top-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'top-left')} />
              
              {/* Edge handles */}
              <div className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'right')} />
              <div className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'left')} />
              <div className="absolute top-0 left-4 right-4 h-2 cursor-n-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'top')} />
              <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleScheduleResizeStart(e, 'bottom')} />
            </>
          )}
        </div>
      )}

      {visibleComponents.calendar && (
        <div
          ref={calendarRef}
          style={getCalendarStyle()}
          onMouseDown={handleCalendarDragStart}
          onContextMenu={(e) => handleContextMenu(e, 'calendar')}
          className={`select-none relative rounded-lg overflow-hidden fade-in-scale delay-3
            ${editMode ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg' : 'border-2 border-opacity-20 border-slate-400'}`}
        >
          <DevOverlay component="calendar" position={calendarPosition} size={calendarSize} />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
              zIndex: 0,
            }}
          />
          <div className="relative z-10 w-full h-full">
            <GoogleCalendar />
          </div>

          {editMode && (
            <>
              {/* Add resize handles similar to Schedule container */}
              <div className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'bottom-right')} />
              <div className="absolute left-0 bottom-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'bottom-left')} />
              <div className="absolute right-0 top-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'top-right')} />
              <div className="absolute left-0 top-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'top-left')} />
              
              {/* Edge handles */}
              <div className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'right')} />
              <div className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'left')} />
              <div className="absolute top-0 left-4 right-4 h-2 cursor-n-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'top')} />
              <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleCalendarResizeStart(e, 'bottom')} />
            </>
          )}
        </div>
      )}

      {visibleComponents.weather && (
        <div
          ref={weatherRef}
          style={getWeatherStyle()}
          onMouseDown={handleWeatherDragStart}
          onContextMenu={(e) => handleContextMenu(e, 'weather')}
          className={`select-none relative rounded-lg overflow-hidden ${weatherMounted ? 'fade-in-scale delay-4' : 'opacity-0'}
            ${editMode ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg' : 'border-2 border-opacity-20 border-slate-400'}`}
        >
          <DevOverlay component="weather" position={weatherPosition} size={weatherSize} />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top right, rgba(0, 0, 0, 0.5), transparent)`,
              zIndex: 0,
            }}
          />
          <div className="relative z-10 w-full h-full">
            <WeatherDashboard />  {/* Updated component name */}
          </div>

          {editMode && (
            <>
              {/* Add resize handles similar to other components */}
              <div className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'bottom-right')} />
              <div className="absolute left-0 bottom-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'bottom-left')} />
              <div className="absolute right-0 top-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'top-right')} />
              <div className="absolute left-0 top-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'top-left')} />
              
              {/* Edge handles */}
              <div className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'right')} />
              <div className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'left')} />
              <div className="absolute top-0 left-4 right-4 h-2 cursor-n-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'top')} />
              <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleWeatherResizeStart(e, 'bottom')} />
            </>
          )}
        </div>
      )}

      {visibleComponents.header && (
        <div
          ref={headerRef}
          style={getHeaderStyle()}
          onMouseDown={handleHeaderDragStart}
          onContextMenu={(e) => handleContextMenu(e, 'header')}
          className={`select-none relative rounded-lg overflow-hidden fade-in-scale delay-0
            ${editMode ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg' : 'border-2 border-opacity-20 border-slate-400'}`}
        >
          <DevOverlay component="header" position={headerPosition} size={headerSize} />
          <div className="relative z-10 w-full h-full">
            <DayHeader onAnnouncementClick={(data) => {
              setAnnouncement(data);
              setShowFullAnnouncement(true);
            }} />
          </div>

          {editMode && (
            <>
              {/* Add resize handles similar to other components */}
              <div className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'bottom-right')} />
              <div className="absolute left-0 bottom-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'bottom-left')} />
              <div className="absolute right-0 top-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'top-right')} />
              <div className="absolute left-0 top-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'top-left')} />
              
              {/* Edge handles */}
              <div className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'right')} />
              <div className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'left')} />
              <div className="absolute top-0 left-4 right-4 h-2 cursor-n-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'top')} />
              <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize hover:bg-blue-500 hover:bg-opacity-20 pointer-events-auto z-50"
                onMouseDown={(e) => handleHeaderResizeStart(e, 'bottom')} />
            </>
          )}
        </div>
      )}

      {/* Add PopupMessage at the root level */}
      {showFullAnnouncement && announcement && (
        <PopupMessage 
          isOpen={showFullAnnouncement}
          onClose={() => setShowFullAnnouncement(false)}
          data={announcement}
        />
      )}

      {/* Add new centered bottom toolbar */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
        <div className={`${currentTheme.main} rounded-full shadow-lg p-2 flex items-center gap-2`}>
          {editMode ? (
            <>
              {isAdmin() && (
                <button
                  onClick={() => setShowDevOverlay(!showDevOverlay)}
                  className={`p-2 rounded-full ${currentTheme.accent} 
                    transition-all duration-300 hover:scale-110 
                    ${showDevOverlay ? 'bg-green-500' : ''}`}
                  title="Toggle Dev Overlay"
                >
                  DEV
                </button>
              )}
              <button
                onClick={() => setShowComponentList(true)}
                className={`p-2 rounded-full ${currentTheme.accent} 
                  transition-all duration-300 hover:scale-110`}
                title="Add Component"
              >
                <FaPlus size={24} />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowTemplates(prev => !prev)}
                  className={`p-2 rounded-full ${currentTheme.accent} 
                    transition-all duration-300 hover:scale-110`}
                  title="Templates"
                >
                  <FaLayerGroup size={24} />
                </button>
                
                {/* Templates dropdown */}
                {showTemplates && (
                  <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 ${currentTheme.main} rounded-lg shadow-lg p-2 min-w-[200px]`}>
                    <div className="flex flex-col gap-2">
                      {Object.entries(TEMPLATES).map(([name, config]) => (
                        <button
                          key={name}
                          onClick={() => handleTemplateSwitch(name, config)}
                          className={`w-full text-left px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text} hover:opacity-80 transition-opacity flex items-center justify-between`}
                        >
                          <span className="capitalize">{config.name}</span>
                          {currentTemplate === name && (
                            <span className="text-green-400">●</span>
                          )}
                        </button>
                      ))}
                      {editMode && (
                        <button
                          onClick={saveAsUserTemplate}
                          className={`w-full text-left px-4 py-2 rounded ${currentTheme.accent} ${currentTheme.text} hover:opacity-80 transition-opacity mt-2 border-t border-gray-600`}
                        >
                          Save Current as Custom
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
          
          <button
            onClick={toggleEditMode}
            className={`p-2 rounded-full ${currentTheme.accent} 
              transition-all duration-300 hover:scale-110`}
            title={editMode ? "Save Layout" : "Edit Layout"}
          >
            {editMode ? <FaSave size={24} /> : <FaEdit size={24} />}
          </button>
        </div>
      </div>
      
      {/* Keep existing modals and popups */}
      {showComponentList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={`${currentTheme.main} rounded-lg p-4 max-w-md w-full mx-4`}>
            <h2 className={`${currentTheme.text} text-xl font-bold mb-4`}>Available Components</h2>
            <div className="space-y-2">
              {!visibleComponents.progress && (
                <button
                  onClick={() => showComponent('progress')}
                  className={`w-full p-2 text-left ${currentTheme.accent} rounded-lg ${currentTheme.text}`}
                >
                  Period Progress
                </button>
              )}
              {!visibleComponents.schedule && (
                <button
                  onClick={() => showComponent('schedule')}
                  className={`w-full p-2 text-left ${currentTheme.accent} rounded-lg ${currentTheme.text}`}
                >
                  Schedule
                </button>
              )}
              {!visibleComponents.calendar && (
                <button
                  onClick={() => showComponent('calendar')}
                  className={`w-full p-2 text-left ${currentTheme.accent} rounded-lg ${currentTheme.text}`}
                >
                  Google Calendar
                </button>
              )}
              {!visibleComponents.weather && (
                <button
                  onClick={() => showComponent('weather')}
                  className={`w-full p-2 text-left ${currentTheme.accent} rounded-lg ${currentTheme.text}`}
                >
                  Weather
                </button>
              )}
              {!visibleComponents.header && (
                <button
                  onClick={() => showComponent('header')}
                  className={`w-full p-2 text-left ${currentTheme.accent} rounded-lg ${currentTheme.text}`}
                >
                  Day Header
                </button>
              )}
            </div>
            <button
              onClick={() => setShowComponentList(false)}
              className={`mt-4 w-full p-2 ${currentTheme.accent} rounded-lg ${currentTheme.text}`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu.show && (
        <div 
          className={`fixed z-50 ${currentTheme.main} rounded-lg shadow-xl border-2 ${currentTheme.border}`}
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="flex flex-col p-2 min-w-[200px]">
            <button
              onClick={() => hideComponent(contextMenu.component)}
              className={`${currentTheme.accent} p-2 rounded mb-1 text-left hover:opacity-80`}
            >
              Remove Component
            </button>
            <button
              onClick={() => resetComponentScale(contextMenu.component)}
              className={`${currentTheme.accent} p-2 rounded mb-1 text-left hover:opacity-80`}
            >
              Reset Size
            </button>
            <button
              onClick={() => resetComponentPosition(contextMenu.component)}
              className={`${currentTheme.accent} p-2 rounded text-left hover:opacity-80`}
            >
              Reset Position
            </button>
          </div>
        </div>
      )}

      {/* Keep existing ending code */}
    </div>
  );
});

export default V3;
