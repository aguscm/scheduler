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
                recurringEventId: ""
            },

            selectedRecurringEvent: {
                calendar: "",
                creationDate: "",
                daysRepeating: [],
                end: "",
                id: "",
                lastModificationDate: "",
                repeatEvery: "",
                start: "",
                status: "",
                title: "",
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
            this.selectedEvent.recurringEventId = "";
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
                    if (events[index].recurringEventId) this.selectedEvent.recurringEventId = events[index].recurringEventId;
                    break;
                }
            }
        },
        clearSelectedRecurringEvent() {
            this.selectedRecurringEvent.calendar = "";
            this.selectedRecurringEvent.creationDate = "";
            this.selectedRecurringEvent.daysRepeating = [];
            this.selectedRecurringEvent.end = "";
            this.selectedRecurringEvent.id = "";
            this.selectedRecurringEvent.lastModificationDate = "";
            this.selectedRecurringEvent.repeatEvery = "";
            this.selectedRecurringEvent.start = "";
            this.selectedRecurringEvent.status = "";
            this.selectedRecurringEvent. title = "";
        },
    }
}