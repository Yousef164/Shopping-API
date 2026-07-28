export class ResponseFormatter {
  static success(statusCode = 200, message = "Success", data = null) {
    return {
      success: true,
      statusCode,
      message,
      ...(data && { data }),
    };
  }

  static error(statusCode = 400, message = "error", errors = []) {
    return {
      success: false,
      statusCode,
      message,
      ...(errors.length > 0 && { errors }),
    };
  }

  static pagnited(
    statusCode = 200,
    message = "Success",
    data = [],
    total = 0,
    page = 1,
    limit = 10,
  ) {
    return {
      success: true,
      statusCode,
      message,
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
