import { Bookmark, Comment, ErrorRounded, MoreVertOutlined, Share, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Avatar, Button, Icon, IconButton, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography } from "@mui/material";
import { Database, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react"
import { Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import app from "./firebase";
const PostList = (props) => {
    const [PostValue, setPostValue] = useState([]);
    
    return (
        <div>
            <button >data</button>
        </div>
    )
};

export default PostList;

