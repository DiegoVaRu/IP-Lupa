const fetchIpInfo = async (ip) => {
    const url = `https://ipinfo.io/${ip}/json?token=b47984dff03148`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

const $ = id => document.getElementById(id)

$('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = $('input');
    const results = $('results');
    const submit = $('submit');

    const ip = input.value.trim();
    if (!ip) return;

    submit.setAttribute('disabled', 'true');
    results.textContent = 'Loading...';

    const ipInfo = await fetchIpInfo(ip);
    submit.removeAttribute('disabled');

    if (ipInfo) {
        results.textContent = JSON.stringify(ipInfo, null, 2);
    } else {
        results.textContent = 'Error fetching IP data.';
    }
});
