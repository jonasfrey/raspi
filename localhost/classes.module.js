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
    ){
        this.s_name_function_designation = s_name_function_designation
        this.n_pin_number = n_pin_number
        this.v_n_gpio_number = v_n_gpio_number
        this.v_n_mics_wpn__last_write = null
        this.v_n_mics_wpn__last_write_where_state_chaned = null
        this.v_n_mics_wpn__last_read = null
        this.v_n_mics_wpn__last_read_where_state_chaned = null
    }
}

export {
    O_raspi,
    O_pin
}