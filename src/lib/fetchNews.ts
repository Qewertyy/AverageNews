const baseUrl = "https://api.qewertyy.dev"

export async function getCategories() : Promise<string[]|undefined>{
  try {
    const response = await fetch(baseUrl+"/news/categories", {
      method: "GET",
    });
    const categories = await response.json();
    return ["Anime",...categories["content"]];
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function topNews(limit?: number) {
  try {
    const response = await fetch(`${baseUrl}/news?limit=${limit || 10}`, {
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

export async function getNewsByCategory(category: string, page?: number) {
  try {
    const response = await fetch(`${baseUrl}/news/${category}?page=${page || 1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const news = await response.json();
    return news['content'];
  } catch (error) {
    console.log(error);
  } 
}