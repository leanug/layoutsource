import { useState } from "react";

export function UseCollection(userId) {
  const [data, setData] = useState('test')

  return {
    data
  }
}