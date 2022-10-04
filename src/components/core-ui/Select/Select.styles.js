
export const customStyles = {
  option: (provided, state) => {

    const background = state.isSelected ? '#212121' : 'none'


    const styles = {
      background,

      ['&:hover']: {
        background: '#212121',
      },

      ['&:active']: {
        background: '#404040',

      },

      ['&:active, &:hover']: {
        color: '#fff'
      },
    }

    return { ...provided, ...styles }
  },
  control: (provided, state) => {

    let border = '1px solid #212121'

    if (state.isFocused) {
      // border = '10px solid red'
    }


    const styles = {
      border,
      padding: 'none',
      borderRadius: '4px',



      ['&:hover']: {
        border: '1px solid #5E5E5E'
      },

    }

    return { ...provided, ...styles }
  },
  singleValue: (provided, state) => {
    const styles = {

    }
    return { ...provided, ...styles };
  },

  menu: (provided, state) => {
    const styles = {
      borderRadius: '4px'
    }
    return { ...provided, ...styles };
  },
  placeholder: (provided, state) => {
    const styles = {
      fontSize: '14px',
      color: 'inherit',
      fontFamily: 'inherit',
    }
    return { ...provided, ...styles };
  },
};
