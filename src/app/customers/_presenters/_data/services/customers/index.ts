import axios from "axios";
import { fromApiParser, toApiParser } from "./parser";
import { getRoadrunnerUrl } from "@/api";

export const getCustomers = async () => {
  const { data } = await axios.get(getRoadrunnerUrl("/customers.json"));

  return data.map(fromApiParser);
};

export const saveCustomer = async (params: Customer) => {
  const { id = "" } = params;

  var result = null;
  if (id) {
    result = await axios.put(getRoadrunnerUrl(`/customers/${id}.json`), {
      repository: toApiParser(params),
    });
  } else {
    result = await axios.post(getRoadrunnerUrl(`/customers.json`), {
      repository: toApiParser(params),
    });
  }

  const { data } = result;
  return fromApiParser(data);
};

export const getCustomer = async (id: number | undefined | string) => {
  if (!id) {
    return null;
  }
  const { data } = await axios.get(getRoadrunnerUrl(`/customers/${id}.json`));

  return fromApiParser(data);
};
