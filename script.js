const BIN_id = "6a92e253f5f4af5e2951a199";

const input = document.querySelector(".link")
const outPutLink = document.querySelector(".display-link")
const btn = document.querySelector(".submit-btn")
const copy = document.querySelector(".copy-svg")

const params = new URLSearchParams(window.location.search);
const id = params.get("id")

const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_id}`;

async function getData(headers) {
    const response = await fetch(`${BASE_URL}/latest`, {
        method: "GET",
        headers
    });

    if (!response.ok) {
        throw new Error(`Read failed: ${response.status}`);
    }
    const result = await response.json();

    return result.record;
}


async function updateData(data, headers) {
    const response = await fetch(BASE_URL, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
    }

    return response.json();
}

async function api() {
    const response = await fetch("https://api.b1aze.workers.dev/")
    const api_key = await response.text()
    return api_key
}

async function main() {
    const headers = {
        "Content-Type": "application/json",
        "X-Master-Key": await api()
    };

    const data = await getData(headers)

    if (id) {
        const keys = Object.keys(data)
        if (keys.includes(id)) {
            window.location.href = data[id]
        }
    }


    btn.addEventListener("click", async function () {
        let linkValue = input.value
        const index = Object.keys(data).length
        data[index] = linkValue
        console.log(data)
        await updateData(data, headers)
        outPutLink.setAttribute("href", linkValue)
        outPutLink.innerHTML = "https://"+window.location.host + window.location.pathname + `?id=${index}`
        input.value = ""
        const element = document.querySelector('.short-link');
        element.classList.remove("hidden")
    })

    copy.addEventListener("click", function () {
        navigator.clipboard.writeText(outPutLink.innerHTML)
    })

}


main()
















