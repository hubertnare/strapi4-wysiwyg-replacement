
import React, { useState } from 'react';
import {
    Button,
    Stack,
    Flex,
    Field,
    FieldLabel,
} from '@strapi/design-system';
import { useLibrary, prefixFileUrlWithBackendUrl } from '@strapi/helper-plugin';
import Editor from '../QuillEditor';

const Wysiwyg = ({ name, onChange, value }) => {
    const [showMediaLibDialog, setShowMediaLibDialog] = useState(false);
    const { components } = useLibrary();
    const MediaLibDialog = components['media-library'];

    const handleToggleMediaLibDialog = () => {
        setShowMediaLibDialog(!showMediaLibDialog);
    };

    const handleSelectAssets = (files) => {
        const formattedFiles = files.map(file => ({
            alt: file.alternativeText || file.name,
            url: prefixFileUrlWithBackendUrl(file.url),
            mime: file.mime,
        }));
        const images = formattedFiles.map(image => `<image src='${image.url}' alt='${image.alt}'>`).join();
        onChange({
            target: {
                name: name,
                value: value + images
            }
        });
        handleToggleMediaLibDialog();
    };

    return (
        <div>
            <Field name={name}>
                <Button variant="secondary" onClick={handleToggleMediaLibDialog}>
                    MediaLib
                </Button>
                <Stack size={2} padding={2}>
                    <Flex>
                        <FieldLabel>{name}</FieldLabel>
                    </Flex>
                    <Editor name={name} onChange={onChange} value={value} />
                </Stack>
                {
                    showMediaLibDialog
                        &&
                    <MediaLibDialog
                        onClose={handleToggleMediaLibDialog}
                        onSelectAssets={handleSelectAssets}
                    />
                }
            </Field>
        </div>
    );
};
export default Wysiwyg;