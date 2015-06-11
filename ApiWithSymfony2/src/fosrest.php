class UsersController
{
    public function getUsersAction()
    {} // "get_users"     [GET] /users

    public function postUsersAction()
    {} // "post_users"    [POST] /users

    public function getUserAction($slug)
    {} // "get_user"      [GET] /users/{slug}

    public function putUserAction($slug)
    {} // "put_user"      [PUT] /users/{slug}

    public function patchUserAction($slug)
    {} // "patch_user"    [PATCH] /users/{slug}

     public function removeUserAction($slug)
    {} // "remove_user"   [GET] /users/{slug}/remove

    public function deleteUserAction($slug)
    {} // "delete_user"   [DELETE] /users/{slug}

    public function getUserCommentAction($slug, $id)
    {} // "get_user_comment"     [GET] /users/{slug}/comments/{id}

    public function editUserCommentAction($slug, $id)
    {} // "edit_user_comment"    [GET] /users/{slug}/comments/{id}/edit
}
