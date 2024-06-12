// Waits until an elemnt is loaded in the DOM
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


async function writeBid(description) {
    const textArea = await waitForElm("#descriptionTextArea")
    textArea.value = "Hello";

    textArea.scrollIntoView();
}


async function main() {
    const body = await waitForElm("app-project-view-details");
    const projectDescription = await waitForElm(".ProjectDescription").innerText

    // Insert Write bid button
    const btn = document.createElement("button")
    btn.innerText = "Write bid"
    btn.onclick = () => writeBid(projectDescription)

    body.insertBefore(btn, body.firstChild)

}


main()