const INTENDED_URL_KEY = 'intendedUrl';

export function getIntendedUrl()
{
    const intendedUrl = localStorage.getItem(INTENDED_URL_KEY)
    if (intendedUrl) {
        localStorage.removeItem(INTENDED_URL_KEY)
    }

    return intendedUrl
}

export function setIntendedUrl(url) {
    localStorage.setItem(INTENDED_URL_KEY, url)
}