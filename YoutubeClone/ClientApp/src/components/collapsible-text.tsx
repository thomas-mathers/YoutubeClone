import { Box, Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";

interface CollapsibleTextProps {
    text: string;
    maxLines: number;
}

const CollapsibleText = (props: CollapsibleTextProps) => {
    const { text, maxLines } = props;
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleClick = useCallback(() => setExpanded(!expanded), [expanded]);

    return (
        <Box>
            {
                expanded ?
                    <Typography variant="body1">
                        {text}
                    </Typography>
                    :
                    <Typography
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: maxLines,
                        }}
                        variant="body1">
                        {text}
                    </Typography>
            }
            <Button onClick={handleClick}>{expanded ? "Show Less" : "Show More"}</Button>
        </Box>
    )
}

export default CollapsibleText;