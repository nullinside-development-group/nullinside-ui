import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-background-webgl',
  templateUrl: './background-webgl.html',
  styleUrl: './background-webgl.scss',
  standalone: true
})
export class BackgroundWebgl implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("canvas")
  canvas: ElementRef<HTMLCanvasElement> | undefined;
  fragmentShaderSource = `#version 300 es
precision mediump float;
out vec4 FragColor;

in vec4 vertexColor; // input variable from vs (same name and type)
uniform vec4 ourColor; // we set this variable in the OpenGL code.

void main() {
    // FragColor = vertexColor;  // Using the output from the vertex-shader.glsl
    FragColor = ourColor;   // Using the uniform
}`;
  vertexShaderSource = `#version 300 es
precision highp float;
layout (location = 0) in vec3 aPos; // position has attribute position 0

out vec4 vertexColor; // specify a color output to the fragment shader

void main() {
    gl_Position = vec4(aPos, 1.0); // we give a vec3 to vec4’s constructor
    vertexColor = vec4(0.5, 0.0, 0.0, 1.0); // output variable to dark-red
}`;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  animate: () => void = () => {};
  dispose = false;
  private buffers: WebGLBuffer[] = [];
  private vertexArrays: WebGLVertexArrayObject[] = [];
  private programs: WebGLProgram[] = [];
  private shaders: WebGLShader[] = [];
  private gl: WebGL2RenderingContext | null = null;

  ngOnInit(): void {
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  ngOnDestroy(): void {
    this.dispose = true;
    window.removeEventListener('resize', this.resize.bind(this));

    // Release the OpenGL resources we allocated
    if (null !== this.gl) {
      for (let i = this.buffers.length - 1; i >= 0; i--) {
        this.gl.deleteBuffer(this.buffers[i]);
      }
      for (let i = this.vertexArrays.length - 1; i >= 0; i--) {
        this.gl.deleteVertexArray(this.vertexArrays[i]);
      }
      for (let i = this.programs.length - 1; i >= 0; i--) {
        this.gl.deleteProgram(this.programs[i]);
      }
      for (let i = this.shaders.length - 1; i >= 0; i--) {
        this.gl.deleteShader(this.shaders[i]);
      }
    }
  }

  ngAfterViewInit(): void {
    const init = this.init();
    if (!init) {
      return;
    }

    this.animate = () => {
      if (this.dispose) {
        return;
      }

      this.render(init[0], init[1]);
      requestAnimationFrame(this.animate);
    };

    this.resize();
  }

  resize() {
    const element = this.canvas?.nativeElement;
    if (null == element) {
      return;
    }

    element.width = window.innerWidth;
    element.height = window.innerHeight;
    this.animate();
  }

  createShader(gl: WebGL2RenderingContext, type: GLenum, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      this.shaders.push(shader);
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    const program = gl.createProgram();
    if (!program) {
      return null
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      this.programs.push(program);
      return program;
    }

    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  init(): [WebGLProgram, WebGLVertexArrayObject] | null {
    const gl = this.canvas?.nativeElement.getContext('webgl2');
    if (!gl) {
      return null;
    }

    // create GLSL shaders, upload the GLSL source, compile the shaders
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, this.vertexShaderSource);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, this.fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    // Link the two shaders into a program
    const program = this.createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      return null;
    }

    const VAO = gl.createVertexArray();
    const VBO = gl.createBuffer();
    const EBO = gl.createBuffer();
    if (!VAO || !VBO || !EBO) {
      return null;
    }

    // Save for disposing of resources later
    this.vertexArrays.push(VAO)
    this.buffers.push(...[VBO, EBO]);

    // bind the Vertex Array Object first, then bind and set vertex buffer(s), and then configure vertex attributes(s).
    gl.bindVertexArray(VAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    const vertices = [
      0.5, 0.5, 0.0,    // top right
      0.5, -0.5, 0.0,   // bottom right
      -0.5, -0.5, 0.0,  // bottom left
      -0.5, 0.5, 0.0    // top left
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
    const indices = [  // note that we start from 0!
      0, 1, 3,  // first Triangle
      1, 2, 3   // second Triangle
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

    // The size of all numbers in WebGL is 4.
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0);
    gl.enableVertexAttribArray(0);

    // note that this is allowed, the call to glVertexAttribPointer registered VBO as the vertex attribute's bound vertex buffer object so afterwards we can safely unbind
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // You can unbind the VAO afterward so other VAO calls won't accidentally modify this VAO, but this rarely happens. Modifying other
    // VAOs requires a call to glBindVertexArray anyways so we generally don't unbind VAOs (nor VBOs) when it's not directly necessary.
    gl.bindVertexArray(null);

    return [program, VAO];
  }

  render(program: WebGLProgram, VAO: WebGLVertexArrayObject): void {
    const gl = this.canvas?.nativeElement.getContext('webgl2');
    if (!gl) {
      return;
    }

    // Save the reference for when we dispose
    this.gl = gl;

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0.10, 0.09, 0.09, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw our first triangle
    gl.useProgram(program);

    const uniformLocation = gl.getUniformLocation(program, "ourColor");
    gl.uniform4fv(uniformLocation, new Float32Array([0.2, 0.18, 0.18, 1]))

    gl.bindVertexArray(VAO);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
  }
}
