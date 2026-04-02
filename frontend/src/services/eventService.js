import api from '../api/axios';

export const eventService = {
    getAllEvents: async (queryParams) => {
        const response = await api.get('/events', { params: queryParams });
        return response.data;
    },
    
    getEventById: async (id) => {
        const response = await api.get(`/events/${id}`);
        return response.data;
    },
    
    registerForEvent: async (id) => {
        const response = await api.post(`/events/${id}/register`);
        return response.data;
    },

    createEvent: async (eventData) => {
        const response = await api.post('/events', eventData);
        return response.data;
    },

    getOrganizerEvents: async () => {
        const response = await api.get('/events/organizer');
        return response.data;
    },

    deleteEvent: async (id) => {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    },

    updateEvent: async (id, eventData) => {
        const response = await api.put(`/events/${id}`, eventData);
        return response.data;
    },

    getEventAttendees: async (id) => {
        const response = await api.get(`/events/${id}/attendees`);
        return response.data;
    }
};