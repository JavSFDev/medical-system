import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { formatDate } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

const events = [
  { title: 'Meeting', start: new Date(), resourceEditable: false}
]



export function Agendax() {
  const businessHour = [ // specify an array instead
  {
    daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
    startTime: '08:00', // 8am
    endTime: '18:00' // 6pm
  },
  {
    daysOfWeek: [ 4, 5 ], // Thursday, Friday
    startTime: '10:00', // 10am
    endTime: '16:00' // 4pm
  }
]
  return (
    <div>
      <h1>Agenda</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        businessHours
        initialView='timeGridWeek'
        //initialView='timelineWeek'
        weekends={false}
        events={events}
        eventContent={renderEventContent}

       // dateClick={this.handleDateClick}
        
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            //eventDurationEditable={false}
          //weekends={this.state.weekendsVisible}
          //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          //  select={this.handleDateSelect}
            //eventContent={renderEventContent} // custom render function
            //eventClick={this.handleEventClick}
            //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
         // businessHours={businessHour}

      />
    </div>
  )

 // handleDateClick = (arg) => { // bind with an arrow function
 //   alert(arg.dateStr)
 // }
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
/**
 * 
 * var calendar = new Calendar(calendarEl, {
  initialView: 'timelineWeek',
  resources: [
    {
      id: 'b',
      title: 'Resource B',
      businessHours: {
        startTime: '11:00',
        endTime: '17:00',
        daysOfWeek: [ 1, 3, 5 ] // Mon,Wed,Fri
      }
    }
  ]
});
 */