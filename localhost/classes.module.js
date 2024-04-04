// here only struct/object/class/model definitions should be mentioned
// for example
class O_raspi{
    constructor(
        s_name, 
        a_o_pin,
        v_s_state,
        v_s_direction
    ){
        this.s_name = s_name
        this.a_o_pin = a_o_pin
        this.v_s_state = v_s_state
        this.v_s_direction = v_s_direction
    }
}
class O_pin{
    constructor(
        s_name_function_designation, 
        n_pin_number,
        v_n_gpio_number,
        s_direction
    ){
        this.s_name_function_designation = s_name_function_designation
        this.n_pin_number = n_pin_number
        this.v_n_gpio_number = v_n_gpio_number
        this.s_direction = s_direction
        this.v_n_mic_sec_wpn__last_write = null
        this.v_n_mic_sec_wpn__last_read = null
        this.o_file_descriptor__value = null
        this.v_a_n_u8_state = null;
        this.n_state = null;
    }
}

export {
    O_raspi,
    O_pin
}