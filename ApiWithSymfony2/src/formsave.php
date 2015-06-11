class UserController extends FOSRestController
{
    public function postAction(Request $request, User $user)
    {
        $form = $this->createForm(new UserAccountType(), $user);
        $form->handleRequest($request);
        if ($form->isValid()) {
            // save $user
            return $this->view($user, Response::HTTP_OK);
        }
        return $this->view($form, Response::HTTP_BAD_REQUEST);
    }
}
