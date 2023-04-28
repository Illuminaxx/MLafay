interface Theme {
    backgroundColor: string;
    textColor: string;
    iconColor: string;
}

const darkTheme: Theme = {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    iconColor: '#000000'
}

const lightTheme: Theme = {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    iconColor: "#000000"
}

export { darkTheme, lightTheme };