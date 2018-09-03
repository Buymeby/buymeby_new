import React from 'react'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const status = {
  open_soon: {
    color: 'green',
    display_text: 'Opening Soon'
  },
  close_soon: {
    color: 'orange',
    display_text: 'Closing Soon'
  },
  open: {
    color: 'green',
    display_text: 'Open'
  },
  closed: {
    color: 'red',
    display_text: 'Closed'
  }
}

export const timeToHumanReadable = function(time) {
  if (!time) {
    return ''
  }

  let date = time;
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

const getDayHours = function(hours) {
  const current_date = new Date()
  const day_index = current_date.getDay()
  return hours.find(day_hours => day_hours.day === days[day_index])
}

const getVendorStatus = function(hours) {
  const current_date = new Date()
  const current_hour = current_date.getHours()
  const current_minutes = current_date.getMinutes()
  let day_hours = getDayHours(hours)
  if (day_hours) {
    const open_hour = new Date(day_hours.open_time).getHours()
    const open_minutes = new Date(day_hours.open_time).getMinutes()
    const close_hour = new Date(day_hours.close_time).getHours()
    const close_minutes = new Date(day_hours.close_time).getMinutes()
    if ((!(current_hour === close_hour && current_minutes < close_minutes)) &&
       ((current_hour === open_hour && current_minutes < open_minutes) ||
       (current_hour === open_hour-1 && current_minutes >= open_minutes) ||
       (open_hour === 0 && current_hour === 23 && current_minutes >= open_minutes)))
    {
      return 'open_soon'
    } else if ((!(current_hour === open_hour && current_minutes < open_minutes)) &&
              ((current_hour === close_hour && current_minutes < close_minutes) ||
              (current_hour === close_hour-1 && current_minutes >= close_minutes) ||
              (close_hour === 0 && current_hour === 23 && current_minutes >= close_minutes)))

    {
      return 'close_soon'
    } else if ((open_hour > close_hour && (current_hour < close_hour || current_hour > open_hour)) ||
              (open_hour > close_hour && current_hour === open_hour && current_minutes >= open_minutes && current_hour > close_hour) ||
              (close_hour > open_hour && current_hour === open_hour && current_minutes >= open_minutes && current_hour < close_hour) ||
              (close_hour > open_hour && current_hour > open_hour && current_hour < close_hour))
    {
      return 'open'
    } else {
      return 'closed'
    }
  } else {
    return 'closed'
  }
}

export const getCurrentHours = function(hours) {
  if (hours) {
    let day_hours = getDayHours(hours)
    if (day_hours && day_hours.open_time && day_hours.close_time) {
      return ': ' + timeToHumanReadable(day_hours.open_time) + ' - ' + timeToHumanReadable(day_hours.close_time)
    }
  }
}

export const getStatusColor = function(hours) {
  if (hours) {
    vendor_status = status[getVendorStatus(hours)]
    return vendor_status.color
  } else {
    return 'red'
  }
}

export const getStatusText = function(hours) {
  if (hours) {
    vendor_status = status[getVendorStatus(hours)]
    return vendor_status.display_text
  } else {
    return 'Closed'
  }
}
