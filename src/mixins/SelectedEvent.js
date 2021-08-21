export const selectedEvent = {
    data() {
        return {
            selectedEvent: {
                id: "",
                calendar: "",
                calendarName: "",
                title: "",
                start: "",
                end: "",
                status: "",
                class: "",
                content: "",
                contentFull: "",
                icon: "",
                creationDate: "",
                applicant: "",
                recurringEvent: {
                    isRecurringEvent: false,
                    repeatingPattern: "", //Weekly, Monthly
                    repeatEvery: "", //Every how many weeks, months
                    repeatingWeekdays: "", // days of the week
                    endDate: "", //the end date of the recurring event
                }
            }

        }
    },
    methods: {
        clearSelectedEvent() {
            this.selectedEvent.id = "";
            this.selectedEvent.calendar = "";
            this.selectedEvent.calendarName = "";
            this.selectedEvent.title = "";
            this.selectedEvent.start = "";
            this.selectedEvent.end = "";
            this.selectedEvent.status = "";
            this.selectedEvent.content = "";
            this.selectedEvent.contentFull = "";
            this.selectedEvent.icon = "";
            this.selectedEvent.creationDate = "";
            this.selectedEvent.applicant = "";
            this.selectedEvent.recurringEvent.isRecurringEvent = false;
            this.selectedEvent.recurringEvent.repeatingPattern = "";
            this.selectedEvent.recurringEvent.repeatEvery = "";
            this.selectedEvent.recurringEvent.repeatingWeekdays = "";
            this.selectedEvent.recurringEvent.endDate = "";
        },
        loadFormSelectedEvent(id, events) {
            this.clearSelectedEvent();
            for (var index in events) {
                if (events[index].id == id) {
                    this.selectedEvent.id = events[index].id;
                    this.selectedEvent.calendar = events[index].calendar;
                    this.selectedEvent.title = events[index].title;
                    this.selectedEvent.start = events[index].start;
                    this.selectedEvent.end = events[index].end;
                    this.selectedEvent.status = events[index].status;
                    this.selectedEvent.content = events[index].content;
                    this.selectedEvent.contentFull = events[index].contentFull;
                    this.selectedEvent.icon = events[index].icon;
                    this.selectedEvent.creationDate = events[index].creationDate;
                    this.selectedEvent.applicant = events[index].applicant;
                    if (events[index].recurringEvent) {
                        this.selectedEvent.recurringEvent.isRecurringEvent = events[index].recurringEvent.isRecurringEvent;
                        this.selectedEvent.recurringEvent.repeatingPattern = events[index].recurringEvent.repeatingPattern;
                        this.selectedEvent.recurringEvent.repeatEvery = events[index].recurringEvent.repeatEvery;
                        this.selectedEvent.recurringEvent.repeatingWeekdays = events[index].recurringEvent.repeatingWeekdays;
                        this.selectedEvent.recurringEvent.endDate = events[index].recurringEvent.endDate;
                    }
                    break;
                }
            }
        },
    }
}