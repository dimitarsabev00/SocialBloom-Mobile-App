import { supabase } from "../lib/supabase";

export const createNotification = async (notification) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      return { success: false, msg: "Something went wrong!" };
    }
    return { success: true, data: data };
  } catch (error) {
    return { success: false, msg: "Something went wrong!" };
  }
};

export const fetchNotifications = async (receiverId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select(
        `
            *,
            sender: senderId ( id, name, image )
        `
      )
      .order("created_at", { ascending: false })
      .eq("receiverId", receiverId);

    if (error) {
      return { success: false, msg: "Could not fetch the notifications" };
    }
    return { success: true, data: data };
  } catch (error) {
    return { success: false, msg: "Something went wrong!" };
  }
};
