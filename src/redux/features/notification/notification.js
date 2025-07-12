import { baseApi } from "../../baseApi/baseApi";


const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: () => ({
                url: `/notification/all`,
                method: "GET",
            }),
            providesTags: ["Notification"],
        }),
        markNotificationAsRead: builder.mutation({
            query: (id) => ({
                url: `/notification/mark-as-read/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Notification"],
        }),
        
    }),
})

export const {
    useGetAllNotificationsQuery,
    useMarkNotificationAsReadMutation
} = notificationApi;