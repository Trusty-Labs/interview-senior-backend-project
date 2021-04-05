# Use environment that closely matches AWS Lambda
FROM lambci/lambda:build-nodejs12.x AS builder

WORKDIR /var/task

# Download dependencies for vips, libheif and libde265
RUN curl -L https://github.com/libvips/libvips/releases/download/v8.9.0/vips-8.9.0.tar.gz | tar xz && \
    curl -L https://github.com/strukturag/libde265/releases/download/v1.0.4/libde265-1.0.4.tar.gz | tar xz && \
    curl -L https://github.com/strukturag/libheif/releases/download/v1.6.1/libheif-1.6.1.tar.gz | tar xz && \
    yum install -y gtk-doc gobject-introspection gobject-introspection-devel expat-devel libjpeg-turbo libjpeg-turbo-devel libpng libpng-devel

# Install h.265 video codec library
RUN cd libde265-1.0.4 && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install

# Install HEIF library
RUN cd libheif-1.6.1 && \
    ./autogen.sh && \
    PKG_CONFIG_PATH=/usr/local/lib/pkgconfig ./configure && \
    make && \
    make install

# Install vips
RUN cd vips-8.9.0 && \
    ./autogen.sh && \
    PKG_CONFIG_PATH=/usr/local/lib/pkgconfig ./configure --prefix=/var/task/vendor && \
    make && \
    make install

# Copy pkg-config files to working directory
RUN cp /usr/local/lib/pkgconfig/* vendor/lib/pkgconfig/ && \
    cp /usr/lib64/pkgconfig/libpcre* vendor/lib/pkgconfig/ && \
    cp /usr/lib64/pkgconfig/glib* vendor/lib/pkgconfig/ && \
    cp /usr/lib64/pkgconfig/gobject* vendor/lib/pkgconfig/ && \
    cp /usr/lib64/pkgconfig/gmodule* vendor/lib/pkgconfig/ && \
    cp /usr/lib64/pkgconfig/gthread* vendor/lib/pkgconfig/ && \
    cp /usr/lib64/pkgconfig/libpng* vendor/lib/pkgconfig/ && \
    cp /usr/lib64/pkgconfig/libjpeg* vendor/lib/pkgconfig/

# Copy compiled binaries to working directory
RUN cp /usr/local/lib/libheif.* vendor/lib/ && \
    cp /usr/local/lib/libde265.* vendor/lib/ && \
    cp /usr/lib64/libpng* vendor/lib/ && \
    cp /usr/lib64/libjpeg* vendor/lib/ && \
    cp -r /usr/lib64/glib*/include/* vendor/include/ && \
    cp -r /usr/include/glib*/* vendor/include/ && \
    cp -r /usr/lib64/gobject* vendor/lib/ && \
    cp /usr/lib64/libexpat* vendor/lib/ && \
    cp /usr/lib64/libgthread* vendor/lib/ && \
    cp /usr/lib64/libgmodule* vendor/lib/ && \
    cp /usr/lib64/libpcre* vendor/lib/ && \
    cp /usr/lib64/libgobject* vendor/lib/ && \
    cp /usr/lib64/libglib* vendor/lib/


# Starting in a new image ensures we have everything for
# an isolated environment.
FROM lambci/lambda:build-nodejs12.x

WORKDIR /var/task

# Copy results from builder image
COPY --from=builder /var/task/vendor ./vendor

# Install sharp with node
RUN LD_LIBRARY_PATH=/var/task/vendor/include PKG_CONFIG_PATH=/var/task/vendor/lib/pkgconfig npm install sharp@v0.24.1 exifreader