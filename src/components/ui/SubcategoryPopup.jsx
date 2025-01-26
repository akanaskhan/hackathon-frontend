import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function SubcategoryPopup({ category, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{category.title} - Subcategories</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-1 gap-4">
          {category.subcategories.map((subcategory, index) => (
            <Link
              key={index}
              to={`/apply/${category.title}/${subcategory}`}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-center"
            >
              {subcategory}
            </Link>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubcategoryPopup;
