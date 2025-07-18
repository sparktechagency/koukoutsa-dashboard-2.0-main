import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSettings: builder.query({
      query: () => ({
        url: "/general-info",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/info/get-privacy-policy",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/info/get-terms-conditions",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/info/get-about",
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),


    updatePrivacyPolicyAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/info/create-privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    addFaqMain: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/general-info/add-new-faq",
        method: "POST",
        body: data,
      }),
    }),
    deleteFaq: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: `/general-info/delete-faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),

    updateTramsAndConditionsAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/info/create-terms-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
    updateAboutUs: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/info/create-about",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    getUserProfile: builder.query({
      query: () => ({
        url: "/users/self/in",
        method: "GET",
        providesTags: ["Profile"],
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/self/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),


    getAllNotification: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
        providesTags: ["Notification"],
      }),
    }),




  }),
});

export const {
  useGetAllSettingsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
  useGetAboutUsQuery,

  useUpdatePrivacyPolicyAllMutation, // ✅ FIXED: Mutation hook 
  useUpdateTramsAndConditionsAllMutation,

  useAddFaqMainMutation,
  useDeleteFaqMutation,

  useUpdateAboutUsMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,

  useGetAllNotificationQuery
} = settingApi;
