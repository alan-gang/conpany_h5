
export default {
  add(a, b) {
    a = String(a);
    b = String(b);
    let c = 0, d = 0, m = 0;
    if (a.indexOf('.') != -1) {
        c = a.split('.')[1].length;
    }
    if (b.indexOf('.') != -1) {
        d = b.split('.')[1].length;
    }
    m = Math.pow(10, Math.max(c, d));
    return (MMath.mul(a, m) + MMath.mul(b, m)) / m;
  },
  sub(a, b) {
    a = String(a);
    b = String(b);
    let c = 0, d = 0, m = 0;
    if (a.indexOf('.') != -1) {
        c = a.split('.')[1].length;
    }
    if (b.indexOf('.') != -1) {
        d = b.split('.')[1].length;
    }
    m = Math.pow(10, Math.max(c, d));
    return (MMath.mul(a, m) - MMath.mul(b, m)) / m;
  },
  mul(a, b) {
    a = String(a);
    b = String(b);
    let c = 0;
    if (a.indexOf('.') != -1) {
        c += a.split('.')[1].length;
        a = a.replace('.', '');
    }
    if (b.indexOf('.') != -1) {
        c += b.split('.')[1].length;
        b = b.replace('.', '');
    }
    return (Number(a) * Number(b)) / Math.pow(10, c);
  },
  div(a, b) {
    a = String(a);
    b = String(b);
    let c = 0, d = 0;
    if (a.indexOf('.') != -1) {
        c = a.split('.')[1].length;
        a = a.replace('.', '');
    }
    if (b.indexOf('.') != -1) {
        d = b.split('.')[1].length;
        b = b.replace('.', '');
    }
    return MMath.mul(Number(a) / Number(b), Math.pow(10, d - c));
  }
}