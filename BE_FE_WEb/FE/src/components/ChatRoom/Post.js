import { Box, Button, CircularProgress, Input, Text } from "@chakra-ui/react"
import { useState } from "react";
import { ImImage } from "react-icons/im";
import useMutation from "../hooks/useMutation";
import useQuery from "../hooks/useMutation";
const URL = "/images";
const validFileTypes = ['image/jpg', 'image/png', 'image/jpeg']
const ErrorText = ({ children, ...props }) => (
    <Text fontSize="lg" color="red.300" {...props}>
        {children}
    </Text>
);
const Posts = () => {
    const {
        mutate: uploadImage,
        isLoading: uploading,
        error: uploadError,
    } = useMutation({ url: URL })
    const { data: imagesUrls = [], isLoading: imageLoading, error: fetchError } = useQuery(URL);

    const [error, setError] = useState('')
    const handleUpload = async e => {
        const file = e.target.files[0];
        console.log(e);

        if (!validFileTypes.find(type => type === file.type)) {
            setError("File must be in JPG/PNG format");
            return;
        }

        const form = new FormData();
        form.append('image', file);

        await uploadImage(form);
    };
    return (
        <div>
            <Input id="imageInput" type="file" hidden onChange={handleUpload} />
            <Button
                as="label"
                htmlFor="imageInput"
                colorScheme="blue"
                variant="outline"
                mb={4}
                cursor="pointer"
                isLoading={uploading}
            ><ImImage style={{ height: "40px", width: "20px" }} /></Button>
            {error && (<ErrorText>{error}</ErrorText>)}
            {uploadError && (<ErrorText>{uploadError}</ErrorText>)}
            {imageLoading && (
                <CircularProgress
                    color="gray.600"
                    trackColor="blue.300"
                    size={7}
                    thickness={10}
                    isIndeterminate
                />)}
            {fetchError && (<ErrorText>{fetchError}</ErrorText>)}
        </div>
    );
}

export default Posts;