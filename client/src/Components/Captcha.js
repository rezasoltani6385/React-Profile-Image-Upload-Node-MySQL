
export const Captcha = () =>{
    var captchaValue = ''

    const randomchar ="hac0bfpe1jk2io3sq4ld5yzt6x789mnruvw";
        // Generate captcha for length of
        // 5 with random character
    for (let i = 1; i < 7; i++) {
        captchaValue += randomchar.charAt(Math.random() * randomchar.length)
    }

    return captchaValue
}