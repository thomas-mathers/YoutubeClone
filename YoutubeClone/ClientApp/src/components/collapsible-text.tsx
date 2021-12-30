import { Box, Link, Typography } from "@mui/material";
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
            <Link underline="none" variant="button" onClick={handleClick}>{expanded ? "Show less" : "Show more"}</Link>
        </Box>
    )
}

export default CollapsibleText;