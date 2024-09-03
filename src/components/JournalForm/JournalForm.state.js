export const INITIAL = {
    isValid: {
        tag: true,
        text: true,
        title: true,
        date: true,
    },
    values: {
        tag: "",
        text: "",
        title: "",
        date: "",
    },
    isReady: false,
};

export function formReducer(state, action) {
    switch (action.type) {
        case "RESET_VALIDITY":
            return { ...state, isValid: INITIAL.isValid};
        case "SUBMIT": {
            const titleValidity =
                action.payload.title?.trim().length != 0 ? true : false;
            const textValidity =
                action.payload.text?.trim().length != 0 ? true : false;
            const tagValidity =
                action.payload.tag?.trim().length != 0 ? true : false;
            const dateValidity = action.payload.date ? true : false;
            const isReady =
                textValidity && titleValidity && tagValidity && dateValidity;
            if (isReady) {
                action.payload.event.target.reset();
                return {
                    values: action.payload,
                    isValid: {
                        text: textValidity,
                        title: titleValidity,
                        tag: tagValidity,
                        date: dateValidity,
                    },
                    isReady: isReady,
                };
            }
            return {
                values: action.payload,
                isValid: {
                    text: textValidity,
                    title: titleValidity,
                    tag: tagValidity,
                    date: dateValidity,
                },
                isReady: isReady,
            };
        }
        case "CLEAR":
            return {
                ...state,
                values: INITIAL.values,
                isReady: false
            };
    }
}
