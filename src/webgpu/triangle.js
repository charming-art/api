function createTriangleRenderPipeline(device, presentationFormat) {
  const module = device.createShaderModule({
    label: "our hardcoded black triangle shaders",
    code: `
      @vertex fn vs(
        @builtin(vertex_index) vertexIndex : u32
      ) -> @builtin(position) vec4f {
        let pos = array(
          vec2f( 0.0,  0.5),  // top center
          vec2f(-0.5, -0.5),  // bottom left
          vec2f( 0.5, -0.5)   // bottom right
        );

        return vec4f(pos[vertexIndex], 0.0, 1.0);
      }

      @fragment fn fs() -> @location(0) vec4f {
        return vec4f(0, 0, 0, 1);
      }
    `,
  });

  return device.createRenderPipeline({
    label: "our hardcoded black triangle pipeline",
    layout: "auto",
    vertex: {
      module,
    },
    fragment: {
      module,
      targets: [{format: presentationFormat}],
    },
  });
}

function createRenderTriangleCommand(device, pipeline, context) {
  const renderPassDescriptor = {
    label: "our basic canvas renderPass",
    colorAttachments: [
      {
        clearValue: [1, 1, 1, 1],
        loadOp: "clear",
        storeOp: "store",
        view: context.getCurrentTexture().createView(),
      },
    ],
  };

  // Makes a command encoder to start encoding commands
  const encoder = device.createCommandEncoder({label: "our encoder"});

  // Makes a render pass encoder to encode render specific commands
  const pass = encoder.beginRenderPass(renderPassDescriptor);
  pass.setPipeline(pipeline);
  pass.draw(3); // Calls our vertex shader 3 times.
  pass.end();

  return encoder.finish();
}

export function webgpu_triangle(I, value) {
  const device = this._device;
  const context = this._ctx;
  const presentationFormat = this._presentationFormat;
  const triangleRenderPipeline = this._triangleRenderPipeline;

  const pipeline = triangleRenderPipeline ?? createTriangleRenderPipeline(device, presentationFormat);
  const commandBuffer = createRenderTriangleCommand(device, pipeline, context)
  device.queue.submit([commandBuffer]);

  this._triangleRenderPipeline = pipeline;
}
