export const buttonData = (buttonType) => {
    switch (buttonType) {
        case "SEE":
            return { imgSrc: "eye-open.png", className: "see" };
        case "EDIT":
            return { imgSrc: "edit.png", className: "edit" };
        case "DELETE":
            return { imgSrc: "delete.png", className: "delete" };    
        default:
            break;
    }
}