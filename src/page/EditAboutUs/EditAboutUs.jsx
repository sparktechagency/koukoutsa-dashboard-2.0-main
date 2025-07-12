import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useEffect, useState } from "react";
import { useGetAboutUsQuery, useUpdateAboutUsMutation } from "../../redux/features/setting/settingApi";

const EditAboutUs = () => {
  const [updateAboutUs, { isLoading }] = useUpdateAboutUsMutation();
  const { data: privacyPolicy, refetch } = useGetAboutUsQuery();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [content, setContent] = useState(""); // State for Quill content

  console.log(content);

  useEffect(() => {
    if (privacyPolicy?.data?.attributes?.content) {
      // If the content is encoded, decode it
      const decodedContent = decodeHtml(privacyPolicy?.data?.attributes?.content);
      setContent(decodedContent); // Set content here
    }
  }, [privacyPolicy]);

  // Decode HTML entities (like &lt; to <)
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleSubmit = async () => {
    console.log("Updated About Us Content:", content);

    try {
      const res = await updateAboutUs({ content: content }).unwrap();
      console.log("Update Response:", res);
      // Check if the response indicates success
      if (res?.code === 200) {
        message.success(res?.message);
        navigate("/settings/about-us");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update About Us.");
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">About Us</h1>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* React Quill for About Us Content */}
          <Form.Item name="content">
            <ReactQuill
              value={content} // Set content as the value here
              placeholder="Write about us here..." // Placeholder text
              onChange={setContent} // Update state on change
              // theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ align: [] }],
                  [{ color: [] }, { background: [] }],
                  ["blockquote", "code-block"],
                  ["link", "image", "video"],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["clean"],
                ],
              }}
              style={{ height: "300px" }}
            />
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end md:mt-16 mt-20">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#ffd400] text-white px-5 text-xl py-2 rounded-md"
              loading={isLoading} // Show loading state
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditAboutUs;
