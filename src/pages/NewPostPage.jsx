import { CloudUpload, Delete } from '@mui/icons-material';
import { Box, Button, Chip, Divider, IconButton, styled, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { uploadFilesToSupabase } from '../utils/fileHelper';
import { useSelector } from 'react-redux';
import { createNewPost } from '../features/posts/postSlice';
import { toast } from 'react-toastify';

const NewPostPage = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isMaxHashtags, setIsMaxHastags] = useState(false);
    const MAX_FILES = 5; // Maximum number of files allowed
    const MAX_HASHTAGS_COUNT = 10;
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

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
            formJson.hashtags = chips;
            formJson.author_id = user?.id || null;

            console.log("POST FORM DATA: ", formJson);

			const data = await createNewPost(formJson);

			if(data){
				toast.success('Post published 🚀', {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					transition: "zoom",
				});
				navigate("/");
			}
        } catch (error) {
			toast.error('Post was not published', {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: "zoom",
			});
            console.error("Error uploading files or submitting post:", error)
        }
    }

    const navigateBack = () => {
        navigate("/");
    }

  return (
    <div className='p-4'>
        <Button onClick={navigateBack} startIcon={<ArrowBackIosNewIcon/>} color='apple-black' variant='text'>back</Button>
          <form onSubmit={handleFormSubmit} className='h-[88vh] flex flex-col justify-between mt-2 lg:w-[800px] md:w-[600px] sm:w-[400px] mx-auto'>
            <div>
            <h1 className='mb-4'>New Post</h1>
                {selectedFiles.length > 0 ? (
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1.2}
                        // onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        navigation
                        pagination={{ clickable: true }}
                        freeMode={true}
                        modules={[FreeMode, Pagination]}
                        scrollbar={{ draggable: true }}
                        className='mb-5'
                    >
                        {selectedFiles.map((file, index) => (
                            <SwiperSlide key={index} className='flex flex-col w-full md:h-[400px] sm:h-[320px] bg-cover bg-center items-center justify-center rounded-xl'>
                                <img src={URL.createObjectURL(file)} alt={file.name} className='md:h-[320px] sm:h-[200px] w-full  bg-cover bg-center rounded-xl object-cover' />
                                <Button variant='contained'
                                    size='small'
                                    color='white'
                                    onClick={() => handleRemoveFile(index)}
                                    sx={{
                                        position: "absolute",
                                        top: 4,
                                        right: 4,
                                        backgroundColor: "#fffa",
                                        aspectRatio: '1',
                                        backdropFilter: 'blur(4px)'
                                        }}>
                                    <Delete/>
                                </Button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className='h-40 flex flex-col items-center justify-center border rounded-md gap-2'>
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

                )}
                <p className='mb-4'>{`Selected files: ${selectedFiles.length}/${MAX_FILES}`}</p>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Write a striking caption"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ width: "100%", marginBottom: "24px" }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', marginTop: '24px'}} className="mb-5">
                    <TextField
                        label="Add some hashtags"
                        variant="outlined"
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
            <Button type='submit' variant='contained' fullWidth className='bottom-0 mt-auto'>create</Button>
        </form>
    </div>
  )
}

export default NewPostPage
