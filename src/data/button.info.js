export const buttonData = (buttonType) => {
    switch (buttonType) {
        case "SEE":
            return { imgSrc: "turquoise-eye.png", className: "see" };
        case "EDIT":
            return { imgSrc: "edit.png", className: "edit" };
        case "DELETE":
            return { imgSrc: "delete.png", className: "delete" };    
        case "VOID":
            return { imgSrc: null, className: "void" };
        default:
            break;
    }
}