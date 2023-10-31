extern crate wasm_bindgen;
use crate::{
    globals::{Color, Matrix3, Shape, Vector3, CELL_SIZE, NULL_VALUE},
    matrix3::matrix3_identity,
};
use std::vec;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Backend {
    pub(crate) cols: usize,
    pub(crate) rows: usize,
    pub(crate) stroke_color: Color,
    pub(crate) fill_color: Color,
    pub(crate) has_stroke: bool,
    pub(crate) has_fill: bool,
    pub(crate) has_background: bool,
    pub(crate) background_color: Color,
    pub(crate) buffer: Vec<u32>,
    pub(crate) shapes: Vec<Shape>,
    pub(crate) mode_view: Matrix3,
    pub(crate) out: Vector3,
    pub(crate) stacks: Vec<Matrix3>,
}

#[wasm_bindgen]
impl Backend {
    pub fn new(cols: usize, rows: usize) -> Backend {
        let buffer: Vec<u32> = vec![NULL_VALUE; cols * rows * CELL_SIZE];
        Backend {
            cols,
            rows,
            buffer,
            stroke_color: [NULL_VALUE, NULL_VALUE, NULL_VALUE, NULL_VALUE],
            fill_color: [NULL_VALUE, NULL_VALUE, NULL_VALUE, NULL_VALUE],
            has_fill: false,
            has_stroke: true,
            has_background: false,
            background_color: [NULL_VALUE, NULL_VALUE, NULL_VALUE, NULL_VALUE],
            mode_view: matrix3_identity(),
            stacks: vec![],
            shapes: vec![],
            out: [0.0, 0.0, 0.0],
        }
    }
}

#[cfg(test)]
mod tests {
    use super::Backend;

    #[test]
    fn should_have_expected_defaults() {
        let backend: Backend = Backend::new(10, 10);
        assert_eq!(backend.cols, 10);
        assert_eq!(backend.rows, 10);
        assert_eq!(backend.buffer.len(), 400);
        assert_eq!(backend.shapes.len(), 0);
        assert_eq!(backend.stacks.len(), 0);
        assert_eq!(backend.has_stroke, true);
        assert_eq!(backend.has_background, false);
        assert_eq!(backend.has_fill, false);
    }
}
