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
                url: `/notification/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),
        readAllMarked: builder.mutation({
            query: () => ({
                url: `/notification/all/read-all`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),

    }),
})

export const {
    useGetAllNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useReadAllMarkedMutation,
} = notificationApi;