import { CloudUpload, Delete } from '@mui/icons-material';
import { Box, Button, Chip, Divider, IconButton, styled, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const NewPostPage = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isMaxHashtags, setIsMaxHastags] = useState(false);
    const MAX_FILES = 5; // Maximum number of files allowed
    const MAX_HASHTAGS_COUNT = 10;
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        // Check if the selected files exceed the maximum allowed
        if (files.length + selectedFiles.length > MAX_FILES) {
            alert(`You can only upload up to ${MAX_FILES} files.`);
            return;
        }

        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            if (chips.length >= MAX_HASHTAGS_COUNT) {
                setIsMaxHastags(true)
                return
            }

            // Prevent duplicate entries
            if (!chips.includes(inputValue.trim())) {
                setChips((prevChips) => [...prevChips, inputValue.trim()]);
            }

            setInputValue('');
            event.preventDefault(); // Prevent form submission or unexpected behavior
        }
    };

    const handleDelete = (chipToDelete) => {
        setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
        setIsMaxHashtags(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        try {
            // Upload files to Supabase and get URLs
            const fileUrls = await uploadFilesToSupabase(selectedFiles);
            console.log("MALIK FILE URLS IDHAR HAI: ", fileUrls);
            formJson.mediaFiles = fileUrls; // Replace file names with URLs

            // Add hashtags
            formJson.hashtags = chips;

            console.log("POST FORM DATA: ", formJson);

            // Handle form submission logic (e.g., API call)
            // await handlePostSubmission(formJson);

            // Close dialog
            handleClose();
        } catch (error) {
            console.error("Error uploading files or submitting post:", error)
        }
    }

    const navigateBack = () => {
        navigate("/");
    }

  return (
    <div className='p-4'>
        <Button onClick={navigateBack} startIcon={<ArrowBackIosNewIcon/>} color='apple-black' variant='text'>back</Button>
        <h1>New Post</h1>
        <form className='h-[88vh] flex flex-col justify-between'>
            <div>
                <div className='h-40 flex items-center justify-center'>
                    <Button
                        component='label'
                        role={undefined}
                        variant='contained'
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                        disableElevation

                    >
                        Upload Media
                        <VisuallyHiddenInput type='file' onChange={handleFileChange} multiple accept="image/*" />
                    </Button>
                </div>
                <p>{`Selected files: ${selectedFiles.length}/${MAX_FILES}`}</p>
                {/* <ul>
                    {selectedFiles.map((file, index) => (
                        <div>
                            <li className='flex flex-row w-full items-center justify-between py-2' key={index}>
                                {file.name}
                                {console.log(file)}
                                <img src={URL.createObjectURL(file)} alt={file.name} className='h-[40px]'/>
                                <IconButton color='error' onClick={() => handleRemoveFile(index)}>
                                    <Delete />
                                </IconButton>
                            </li>
                            <Divider></Divider>
                        </div>
                    ))}
                </ul> */}
                <Swiper
                    spaceBetween={40}
                    slidesPerView={1}
                    // onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    className='my-5'
                >
                    {selectedFiles.map((file, index) => (
                        <SwiperSlide key={index} className='flex flex-col w-[160px] h-[160px] items-center justify-between py-2 border-2'>
                            <img src={URL.createObjectURL(file)} alt={file.name} className='w-full' />
                            {file.name}
                            <IconButton color='error' onClick={() => handleRemoveFile(index)}>
                                <Delete />
                            </IconButton>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Write a striking caption"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={4}
                    sx={{ width: "100%", marginBottom: "24px" }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', marginTop: '24px', overflowY: "scroll"}} className="mb-5">
                    <TextField
                        label="Add some hashtags"
                        variant="standard"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type and press Enter"
                        fullWidth
                    />
                    {isMaxHashtags ?
                        <Typography variant='caption' color="error">
                            Max hashtags added
                        </Typography>
                        : ''
                    }
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {chips.map((chip, index) => (
                            <Chip
                                key={index}
                                label={chip}
                                onDelete={() => handleDelete(chip)}
                                color="disabled"
                            />
                        ))}
                    </Box>
                </Box>
            </div>
            <Button variant='contained' fullWidth className='bottom-0 mt-auto'>create</Button>
        </form>
    </div>
  )
}

export default NewPostPage
