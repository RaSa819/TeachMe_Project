import React from 'react';
import classes from './formInput.module.css';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const CustomInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default function FormInput({ label, hint, value, onChange, textarea, dropdown, dropdownOptions }) {


    const [dropdownValue, setDropdownValue] = React.useState(value || "");
    const getDropdownMenuItem = (name) => {
        
        const itemToShow = name?.label || name;

        return (
            <MenuItem key={itemToShow} value={itemToShow} >
                {itemToShow}
            </MenuItem>
        )
    };

    const onDropdownChange = (event) => {
        const newValue = event.target.value;
        setDropdownValue(newValue);
        onChange?.(event);
    }
    return (
        <div className={classes.formInput}>


            {
                (!textarea && !dropdown) && <FormControl variant="standard" sx={{ width: '300px' }}>
                    <InputLabel shrink >
                        {label}
                    </InputLabel>
                    <CustomInput placeholder={hint} onChange={onChange} value={value} />
                </FormControl>
            }
            {
                (textarea) && <div className={classes.txtArea}>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel shrink >
                            {label}
                        </InputLabel>
                        <textarea
                            placeholder={hint} onChange={onChange} value={value}
                        />
                    </FormControl>
                </div>
            }
            {
                (dropdown) && <div className={classes.txtArea}>
                    <FormControl variant="standard" sx={{ width: '300px' }}>
                        <InputLabel shrink >
                            {label}
                        </InputLabel>
                        <Select
                            sx={{ marginTop: '24px'}}
                            displayEmpty
                            value={dropdownValue}
                            onChange={onDropdownChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected?.length === 0) return hint;
                                
                                return  selected?.label || selected;
                            }}
                            // MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value="" >
                                {hint}
                            </MenuItem>
                            {(dropdownOptions?.length > 0) && dropdownOptions.map(getDropdownMenuItem)}
                        </Select>
                    </FormControl>
                </div>
            }


        </div>
    );
}




