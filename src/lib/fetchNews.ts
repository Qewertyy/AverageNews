export async function getCategories() {
  try {
    const response = await fetch("https://api.qewertyy.me/news/categories", {
      method: "GET",
    });
    const categories = await response.json();
    return categories["content"];
  } catch (error) {
    console.log(error);
  }
}

export async function topNews(limit?: number) {
  try {
    const response = await fetch(`https://api.qewertyy.me/news?limit=${limit || 10}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const top = await response.json();
    return top['content'];
  } catch (error) {
    console.log(error);
  }
}