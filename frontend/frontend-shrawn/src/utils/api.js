const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {
    let access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${access}`,
    };

    let response = await fetch(`${API_URL}${endpoint}`, options);

    // If token expired
    if (response.status === 401 && refresh) {
        const refreshResponse = await fetch(
            `${API_URL}/user/token/refresh/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh }),
            }
        );

        const refreshData = await refreshResponse.json();

        if (refreshResponse.ok) {
            localStorage.setItem("access", refreshData.access);

            options.headers.Authorization = `Bearer ${refreshData.access}`;

            response = await fetch(`${API_URL}${endpoint}`, options);
        } else {
            localStorage.clear();
            window.location.href = "/login";
        }
    }

    return response;
}