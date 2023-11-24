import axios from "axios";


export default async function fetchUser(token : string) {
    const url = "https://www.googleapis.com/oauth2/v3/userinfo";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
        if(!token) {
            throw new Error('No token found');
        } else {
            const response = await axios.get(url, {headers})
            if(response.status === 200) {
                const { data } = response

                if(data) {
                    const userData = {
                        id: data.sub,
                        name: data.name,
                        image: data.picture
                    }

                    return userData;
                }
            }
        }
    } catch(error) {
        console.error(error);
    }
}

