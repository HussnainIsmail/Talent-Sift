'use server';
export const get = async () => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/users`);
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
  
      const json = await data.json();
      console.log('Parsed JSON:', json); 
      return json;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  };
  