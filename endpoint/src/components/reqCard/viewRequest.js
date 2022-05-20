import React, { useContext } from 'react'
import FormInput from '../../components/formInput';
import { timeList } from '../../general/datas'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LanguageContext } from '../../App';


export default (props) => {
    const language = React.useContext(LanguageContext);
    const { data } = props;
    data.requestInfo.description = data.requestInfo.description ? data.requestInfo.description : ''
    return (
        <div>
            {data && data.requestInfo && 
        <form className="row">
            <div>
                <FormInput
                    required
                    id="title"
                    name="title"
                    label={language.Title}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    sx={{ marginRight: "5px" }}
                    value={data.requestInfo.title}
                    onChange={() => {}}
                    disabled
                />
            </div>
            <div>
                <FormInput
                    required
                    id="description"
                    name="description"
                    label={language.Description}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    value={data.requestInfo.description}
                    disabled
                />
            </div>
            <div>
                <FormControl variant="standard" sx={{ width: '300px' }}>
                    <InputLabel shrink >
                     {language.Time}
                    </InputLabel>
                    <Select style={{marginTop:'24px'}} value={data.requestInfo.time} defaultValue={timeList.find(v => v.value == data.requestInfo.time)} disabled>
                        {timeList.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </form>
}
    </div>
    )
    
}