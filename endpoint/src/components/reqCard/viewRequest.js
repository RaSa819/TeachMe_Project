import React, { useContext } from 'react'
import FormInput from '../../components/formInput';
import { timeList } from '../../general/datas'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';


export default (props) => {
    const { data } = props;
    data.requestInfo.description = data.requestInfo.description ? data.requestInfo.description : ''
    console.log('timeList::',timeList)
    console.log('data.timeLession::',data.requestInfo.time)
    console.log('timeList.find(v => v.value == data.timeLesson)?.label:::', timeList.find(v => v.value == data.requestInfo.time))
    return (
        <div>
            {data && data.requestInfo && 
        <form className="row">
            <div>
                <FormInput
                    required
                    id="title"
                    name="title"
                    label="Title"
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
                    label="Description"
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
                        Time of lesson
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