export const postingPost = async ({ title, content }: { title: string; content: string }) => {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
