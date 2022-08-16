const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: data
    });

    return await res.json();  ///Promice
};

async function getResorce (url) {
    let res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();  ///Promice
};

export {postData};
export {getResorce};