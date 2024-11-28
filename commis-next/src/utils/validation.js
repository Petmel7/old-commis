export const validateName = (name) => {
    const errors = {};
    if (!name.trim()) {
        errors.name = "Ім'я є обов'язковим";
    }
    return errors;
}

export const validateEmail = (email) => {
    const errors = {};
    if (!email.trim()) {
        errors.email = "Email є обов'язковим";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Некоректний формат email";
    }
    return errors;
};

export const validatePassword = (password) => {
    const errors = {};
    if (!password.trim()) {
        errors.password = "Пароль є обов'язковим";
    } else if (password.length < 4) {
        errors.password = "Пароль повинен містити щонайменше 6 символів";
    }
    return errors;
};

export const validateSize = (size) => {
    const errors = {};
    if (!size.trim()) {
        errors.size = "Додайте розмір будь-ласка.";
    }
    return errors;
};

// export const validateArray = (data) => Array.isArray(data) ? data : [];

export const validateArray = (data) => {
    if (!data || !Array.isArray(data)) return []; // Повертає порожній масив, якщо дані некоректні
    return data;
};




