import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import axios from 'axios';
import { useAuthContext } from '../Contexts/useAuthContext';

export default function TextareaValidator() {
    var { user } = useAuthContext()
    const [comments, setcomments] = React.useState();

    var obj = JSON.parse(window.sessionStorage.getItem('productdata'));
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setvalue] = React.useState("");
    const [flag, setflag] = React.useState(true);
    React.useEffect(() => {
        axios.post("http://localhost:8000/product/getcomment", { pid: obj.id }).then(res => {
            setcomments(res.data)
        })
    }, [flag])
    return (
        <div sx={{ justifyContent: 'center' }}>
            {comments && comments.map((val, i) => {
                return <div style={{ borderRadius:"4px",textAlign:"center",backgroundColor: "#898989",width:"40%", margin: "0 auto" }} key={i}>
                    <p style={{fontSize:"12px"}}> {val.username}</p>
                    <p> {val.body}</p>
                </div>
            })}
            <FormControl sx={{ width: "30%", margin: "10px auto" }} >
                <FormLabel>Your comment</FormLabel>
                <Textarea
                    sx={{ backgroundColor: "#899798" }}
                    placeholder="Type something here…"
                    minRows={3}
                    value={value}
                    onChange={((e) => setvalue(e.target.value))}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                flex: 'auto',
                            }}
                        >
                            <IconButton
                                variant="plain"
                                color="neutral"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                                <FormatBold />
                                <KeyboardArrowDown fontSize="md" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                size="sm"
                                placement="bottom-start"
                                sx={{ '--List-decorator-size': '24px' }}
                            >
                                {['200', 'normal', 'bold'].map((weight) => (
                                    <MenuItem
                                        key={weight}
                                        selected={fontWeight === weight}
                                        onClick={() => {
                                            setFontWeight(weight);
                                            setAnchorEl(null);
                                        }}
                                        sx={{ fontWeight: weight }}
                                    >
                                        <ListItemDecorator>
                                            {fontWeight === weight && <Check fontSize="sm" />}
                                        </ListItemDecorator>
                                        {weight === '200' ? 'lighter' : weight}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <IconButton
                                variant={italic ? 'soft' : 'plain'}
                                color={italic ? 'primary' : 'neutral'}
                                aria-pressed={italic}
                                onClick={() => setItalic((bool) => !bool)}
                            >
                                <FormatItalic />
                            </IconButton>
                            <Button onClick={(() => {
                                axios.post("http://localhost:8000/product/addcomment", { email: user.email, comment: value, pid: obj.id }).then(res => {
                                    setvalue("");
                                    setflag(a => !a);
                                })
                            })} sx={{ ml: 'auto' }}>Send</Button>
                        </Box>
                    }
                    sx={{
                        minWidth: 300,
                        fontWeight,
                        fontStyle: italic ? 'italic' : 'initial',
                    }}
                />
            </FormControl>
        </div>
    );
}