export const DEFAULT_PROGRESS_SIZE = { width: 700, height: 155 };
export const DEFAULT_SCHEDULE_SIZE = { width: 400, height: 484 };
export const DEFAULT_CALENDAR_SIZE = { width: 400, height: 484 };
export const DEFAULT_WEATHER_SIZE = { 
  width: DEFAULT_PROGRESS_SIZE.width,
  height: 315
};
export const DEFAULT_HEADER_SIZE = { 
  width: DEFAULT_PROGRESS_SIZE.width,
  height: 283
};

export const DEFAULT_POSITIONS = {
  progress: {
    x: window.innerWidth / 2 - DEFAULT_PROGRESS_SIZE.width / 2,
    y: window.innerHeight / 2 - DEFAULT_PROGRESS_SIZE.height / 2
  },
  schedule: {
    x: window.innerWidth / 2 - DEFAULT_PROGRESS_SIZE.width / 2 - DEFAULT_SCHEDULE_SIZE.width - 20,
    y: window.innerHeight / 2 - DEFAULT_SCHEDULE_SIZE.height / 2
  },
  calendar: {
    x: window.innerWidth / 2 + DEFAULT_PROGRESS_SIZE.width / 2 + 20,
    y: window.innerHeight / 2 - DEFAULT_CALENDAR_SIZE.height / 2
  },
  weather: {
    x: window.innerWidth / 2 - DEFAULT_WEATHER_SIZE.width / 2,
    y: window.innerHeight / 2 + DEFAULT_PROGRESS_SIZE.height / 2 + 20
  },
  header: {
    x: window.innerWidth / 2 - DEFAULT_HEADER_SIZE.width / 2,
    y: window.innerHeight / 2 - DEFAULT_PROGRESS_SIZE.height / 2 - DEFAULT_HEADER_SIZE.height - 20
  }
};

export const DEFAULT_VISIBILITY = {
  progress: true,
  schedule: true,
  calendar: true,
  weather: true,
  header: true
};

export const JUST_PERIODS = {
  progress: {
    width: 790,
    height: 870,
    x: 80,
    y: 87,
  },
  schedule: {
    width: 1150,
    height: 870,
    x: 889,
    y: 87,
  }
};

export const TEMPLATES = {
  default: {
    positions: DEFAULT_POSITIONS,
    sizes: {
      progress: DEFAULT_PROGRESS_SIZE,
      schedule: DEFAULT_SCHEDULE_SIZE,
      calendar: DEFAULT_CALENDAR_SIZE,
      weather: DEFAULT_WEATHER_SIZE,
      header: DEFAULT_HEADER_SIZE
    },
    visibility: DEFAULT_VISIBILITY,
    name: 'Default Layout'
  },
  boardMode: {
    positions: {
      progress: {
        x: window.innerWidth / 2 - (DEFAULT_PROGRESS_SIZE.width * 1.5) / 2,
        y: window.innerHeight / 2 - (DEFAULT_PROGRESS_SIZE.height * 1.2) / 2
      },
      schedule: DEFAULT_POSITIONS.schedule,
      calendar: DEFAULT_POSITIONS.calendar,
      weather: DEFAULT_POSITIONS.weather,
      header: DEFAULT_POSITIONS.header
    },
    sizes: {
      progress: {
        width: DEFAULT_PROGRESS_SIZE.width * 1.5,
        height: DEFAULT_PROGRESS_SIZE.height * 1.2
      },
      schedule: DEFAULT_SCHEDULE_SIZE,
      calendar: DEFAULT_CALENDAR_SIZE,
      weather: DEFAULT_WEATHER_SIZE,
      header: DEFAULT_HEADER_SIZE
    },
    visibility: {
      progress: true,
      schedule: false,
      calendar: false,
      weather: false,
      header: false
    },
    name: 'Board Mode'
  },
  justPeriods: {
    positions: {
      progress: {
        x: JUST_PERIODS.progress.x,
        y: JUST_PERIODS.progress.y
      },
      schedule: {
        x: JUST_PERIODS.schedule.x,
        y: JUST_PERIODS.schedule.y
      },
      calendar: DEFAULT_POSITIONS.calendar,
      weather: DEFAULT_POSITIONS.weather,
      header: DEFAULT_POSITIONS.header
    },
    sizes: {
      progress: {
        width: JUST_PERIODS.progress.width,
        height: JUST_PERIODS.progress.height
      },
      schedule: {
        width: JUST_PERIODS.schedule.width,
        height: JUST_PERIODS.schedule.height
      },
      calendar: DEFAULT_CALENDAR_SIZE,
      weather: DEFAULT_WEATHER_SIZE,
      header: DEFAULT_HEADER_SIZE
    },
    visibility: {
      progress: true,
      schedule: true,
      calendar: false,
      weather: false,
      header: false
    },
    name: 'Just Periods'
  },
  user: {
    positions: {},
    sizes: {},
    visibility: {},
    name: 'Custom Layout'
  }
};
